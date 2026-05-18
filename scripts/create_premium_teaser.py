from pathlib import Path
import math
import shutil

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
PACKAGE = ROOT / "product-showcase-package"
FRAME_DIR = PACKAGE / "premium_teaser_frames"
GIF_PATH = PACKAGE / "KataPult_Premium_Product_Teaser.gif"
MP4_PATH = PACKAGE / "KataPult_Premium_Product_Teaser.mp4"

W, H = 1280, 720
MP4_FPS = 24
GIF_FPS = 12
DURATION = 9.6

C = {
    "bg": "#070A18",
    "bg2": "#0A1024",
    "panel": "#101827",
    "panel2": "#111C33",
    "line": "#2C3A55",
    "muted": "#A6B0C2",
    "soft": "#EAF0F7",
    "white": "#FFFFFF",
    "lime": "#A8D83A",
    "lime2": "#CFEF72",
    "cyan": "#69D7E5",
    "ink": "#111827",
}


def font(size, bold=False, light=False):
    candidates = [
        "C:/Windows/Fonts/segoeuil.ttf" if light else ("C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf"),
        "C:/Windows/Fonts/calibril.ttf" if light else ("C:/Windows/Fonts/calibrib.ttf" if bold else "C:/Windows/Fonts/calibri.ttf"),
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


F = {
    "display": font(52, light=True),
    "headline": font(42, light=True),
    "title": font(30, True),
    "body": font(19),
    "body_b": font(19, True),
    "small": font(14),
    "small_b": font(14, True),
    "tiny": font(12),
    "dash_title": font(24, True),
    "dash_metric": font(28, True),
}


def rgb(hex_color):
    hex_color = hex_color.lstrip("#")
    return tuple(int(hex_color[i : i + 2], 16) for i in (0, 2, 4))


def rgba(hex_color, alpha=255):
    return rgb(hex_color) + (alpha,)


def clamp(v, lo=0, hi=1):
    return max(lo, min(hi, v))


def ease_out(t):
    t = clamp(t)
    return 1 - (1 - t) ** 3


def ease_in_out(t):
    t = clamp(t)
    return t * t * (3 - 2 * t)


def lerp(a, b, t):
    return a + (b - a) * t


def lerp_box(a, b, t):
    return tuple(int(lerp(a[i], b[i], t)) for i in range(4))


def draw_background():
    img = Image.new("RGBA", (W, H), rgba(C["bg"]))
    px = img.load()
    top = rgb(C["bg2"])
    bottom = rgb(C["bg"])
    for y in range(H):
        k = y / (H - 1)
        row = tuple(int(lerp(top[i], bottom[i], k)) for i in range(3)) + (255,)
        for x in range(W):
            px[x, y] = row

    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay, "RGBA")
    for x in range(0, W, 96):
        d.line((x, 0, x, H), fill=(255, 255, 255, 4), width=1)
    for y in range(0, H, 96):
        d.line((0, y, W, y), fill=(255, 255, 255, 4), width=1)
    d.rectangle((0, 0, W, 4), fill=rgba(C["lime"], 230))
    d.rectangle((0, H - 4, W, H), fill=(0, 0, 0, 70))
    img.alpha_composite(overlay)
    return img


def shadow(layer, box, radius=24, blur=18, alpha=105):
    sh = Image.new("RGBA", layer.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(sh, "RGBA")
    sd.rounded_rectangle(box, radius=radius, fill=(0, 0, 0, alpha))
    sh = sh.filter(ImageFilter.GaussianBlur(blur))
    layer.alpha_composite(sh)


def rounded(draw, box, fill, outline=None, radius=24, width=2):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def text(draw, xy, value, fnt, fill, anchor=None, alpha=255):
    color = rgba(fill, alpha) if isinstance(fill, str) and fill.startswith("#") else fill
    draw.text(xy, value, font=fnt, fill=color, anchor=anchor)


def wrap_lines(draw, value, fnt, max_width):
    lines, cur = [], ""
    for word in value.split():
        candidate = (cur + " " + word).strip()
        if draw.textbbox((0, 0), candidate, font=fnt)[2] <= max_width:
            cur = candidate
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def paragraph(draw, xy, value, fnt, fill, max_width, line_gap=6, alpha=255):
    x, y = xy
    for line in wrap_lines(draw, value, fnt, max_width):
        text(draw, (x, y), line, fnt, fill, alpha=alpha)
        y += fnt.size + line_gap
    return y


def fade_layer(base, painter, opacity):
    if opacity <= 0:
        return
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    painter(layer)
    if opacity < 1:
        alpha = layer.getchannel("A").point(lambda p: int(p * opacity))
        layer.putalpha(alpha)
    base.alpha_composite(layer)


def pill(draw, box, label, fill, fg=C["bg"], fnt=None):
    fnt = fnt or F["small_b"]
    rounded(draw, box, fill, radius=13)
    bbox = draw.textbbox((0, 0), label, font=fnt)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    text(draw, (box[0] + (box[2] - box[0] - tw) / 2, box[1] + (box[3] - box[1] - th) / 2 - 1), label, fnt, fg)


def material_card(layer, box, label, detail, opacity=1, accent=C["cyan"]):
    if opacity <= 0:
        return
    if box[2] - box[0] < 90 or box[3] - box[1] < 46:
        return
    card = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(card, "RGBA")
    shadow(card, box, radius=16, blur=12, alpha=62)
    rounded(d, box, rgba(C["panel"], int(238 * opacity)), outline=rgba(C["line"], int(205 * opacity)), radius=16, width=1)
    d.rounded_rectangle((box[0] + 18, box[1] + 18, box[0] + 23, box[3] - 18), radius=3, fill=rgba(accent, int(230 * opacity)))
    text(d, (box[0] + 42, box[1] + 13), label, F["body_b"], rgba(C["white"], int(255 * opacity)))
    text(d, (box[0] + 42, box[1] + 42), detail, F["small"], rgba(C["muted"], int(245 * opacity)))
    layer.alpha_composite(card)


def module_card(layer, box, label, detail, p, accent=C["lime"]):
    if p <= 0:
        return
    y_shift = int((1 - ease_out(p)) * 20)
    box = (box[0], box[1] + y_shift, box[2], box[3] + y_shift)
    opacity = ease_out(p)
    if box[2] - box[0] < 90 or box[3] - box[1] < 46:
        return
    card = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(card, "RGBA")
    shadow(card, box, radius=16, blur=10, alpha=int(65 * opacity))
    rounded(d, box, rgba(C["panel"], int(245 * opacity)), outline=rgba(C["line"], int(210 * opacity)), radius=16, width=1)
    d.rounded_rectangle((box[0] + 18, box[1] + 18, box[0] + 23, box[3] - 18), radius=3, fill=rgba(accent, int(235 * opacity)))
    text(d, (box[0] + 42, box[1] + 14), label, F["body_b"], rgba(C["white"], int(255 * opacity)))
    text(d, (box[0] + 42, box[1] + 43), detail, F["small"], rgba(C["muted"], int(245 * opacity)))
    layer.alpha_composite(card)


MATERIALS = [
    {
        "label": "Notes",
        "detail": "Personal summaries",
        "final": (84, 330, 304, 398),
        "start": (-260, 330, -40, 398),
        "accent": C["cyan"],
    },
    {
        "label": "PDFs",
        "detail": "Reference files",
        "final": (342, 372, 562, 440),
        "start": (-230, 372, -10, 440),
        "accent": C["lime"],
    },
    {
        "label": "Screenshots",
        "detail": "Saved examples",
        "final": (600, 322, 844, 390),
        "start": (1360, 322, 1604, 390),
        "accent": C["cyan"],
    },
    {
        "label": "Links",
        "detail": "Useful pages",
        "final": (888, 376, 1108, 444),
        "start": (1420, 376, 1640, 444),
        "accent": C["lime"],
    },
    {
        "label": "Quizlet",
        "detail": "Existing sets",
        "final": (226, 506, 446, 574),
        "start": (-270, 506, -50, 574),
        "accent": C["lime"],
    },
    {
        "label": "LLM prompts",
        "detail": "Extra practice",
        "final": (636, 508, 880, 576),
        "start": (1400, 508, 1644, 576),
        "accent": C["cyan"],
    },
]


def draw_materials(layer, progress=1, drift=0, dim=0, pull=0):
    d = ImageDraw.Draw(layer, "RGBA")
    hub = (640, 364)
    for i, item in enumerate(MATERIALS):
        enter = ease_out(clamp(progress * 1.25 - i * 0.08))
        box = lerp_box(item["start"], item["final"], enter)
        if drift:
            dx = math.sin(i * 1.7) * drift
            dy = math.cos(i * 1.3) * drift
            box = tuple(int(v + (dx if n % 2 == 0 else dy)) for n, v in enumerate(box))
        if pull:
            center = ((box[0] + box[2]) / 2, (box[1] + box[3]) / 2)
            w = (box[2] - box[0]) * (1 - 0.72 * pull)
            h = (box[3] - box[1]) * (1 - 0.62 * pull)
            cx = lerp(center[0], hub[0], pull)
            cy = lerp(center[1], hub[1], pull)
            box = (int(cx - w / 2), int(cy - h / 2), int(cx + w / 2), int(cy + h / 2))
            d.line((center[0], center[1], hub[0], hub[1]), fill=rgba(item["accent"], int(80 * pull)), width=2)
        opacity = (1 - dim) * enter * (1 - 0.65 * pull)
        material_card(layer, box, item["label"], item["detail"], opacity=opacity, accent=item["accent"])


def hub(layer, center, scale=1, glow=1):
    cx, cy = center
    d = ImageDraw.Draw(layer, "RGBA")
    w, h = int(252 * scale), int(94 * scale)
    box = (int(cx - w / 2), int(cy - h / 2), int(cx + w / 2), int(cy + h / 2))
    glow_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow_layer, "RGBA")
    gd.rounded_rectangle((box[0] - 10, box[1] - 10, box[2] + 10, box[3] + 10), radius=34, outline=rgba(C["lime"], int(130 * glow)), width=3)
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(10))
    layer.alpha_composite(glow_layer)
    shadow(layer, box, radius=30, blur=18, alpha=120)
    rounded(d, box, rgba(C["panel2"], 245), outline=rgba(C["lime"], 230), radius=28, width=2)
    text(d, (cx, cy - 15), "KataPult", F["title"], C["white"], anchor="mm")
    text(d, (cx, cy + 20), "Practice hub", F["small_b"], C["lime"], anchor="mm")


def browser_shell(layer, box):
    x1, y1, x2, y2 = box
    d = ImageDraw.Draw(layer, "RGBA")
    shadow(layer, box, radius=28, blur=22, alpha=125)
    rounded(d, box, C["white"], outline="#2A3650", radius=28, width=2)
    rounded(d, (x1, y1, x2, y1 + 42), C["soft"], radius=28)
    for i, col in enumerate(["#F87171", "#FACC15", "#34D399"]):
        d.ellipse((x1 + 24 + i * 25, y1 + 15, x1 + 37 + i * 25, y1 + 28), fill=col)
    d.rounded_rectangle((x1 + 152, y1 + 14, x2 - 32, y1 + 29), radius=8, fill="#DDE5EF")


def dashboard(layer, box, progress=1):
    x1, y1, x2, y2 = box
    browser_shell(layer, box)
    d = ImageDraw.Draw(layer, "RGBA")
    pad = 28
    top = y1 + 42
    d.rectangle((x1 + 1, top, x2 - 1, y2 - 1), fill="#F8FAFC")
    text(d, (x1 + pad, top + 28), "KataPult", F["body_b"], "#35235F")
    pill(d, (x2 - 190, top + 22, x2 - 52, top + 54), "5-day streak", "#FFF2CD", "#6B4C00", F["tiny"])
    text(d, (x1 + pad, top + 88), "Today's Bahasa drill", F["dash_title"], C["ink"])
    text(d, (x1 + pad, top + 124), "A short practice set based on current weak areas.", F["small"], "#667085")

    cards = [
        ("Today's practice", "10 mins", "#ECFEFF"),
        ("Generated questions", "12", "#F7FEE7"),
        ("Weak area", "Sentence structure", "#F4F2FF"),
        ("Review due", "8 items", "#FFF7ED"),
    ]
    for i, (label, value, fill) in enumerate(cards):
        p = ease_out(clamp(progress * 4 - i * 0.55))
        col, row = i % 2, i // 2
        cx = x1 + pad + col * 250
        cy = top + 178 + row * 104 + int((1 - p) * 18)
        d.rounded_rectangle((cx, cy, cx + 220, cy + 78), radius=18, fill=fill, outline="#E2E8F0", width=2)
        text(d, (cx + 18, cy + 14), label, F["tiny"], "#667085", alpha=int(255 * p))
        text(d, (cx + 18, cy + 38), value, F["body_b"], C["ink"], alpha=int(255 * p))

    panel = (x2 - 250, top + 96, x2 - 48, y2 - 58)
    d.rounded_rectangle(panel, radius=22, fill="#111827", outline="#273247", width=2)
    text(d, (panel[0] + 24, panel[1] + 28), "Progress", F["body_b"], C["white"])
    text(d, (panel[0] + 24, panel[1] + 68), "5-day streak", F["dash_metric"], C["lime"])
    text(d, (panel[0] + 24, panel[1] + 108), "Keep the routine small.", F["small"], "#CBD5E1")
    bar = (panel[0] + 24, panel[1] + 154, panel[2] - 24, panel[1] + 168)
    d.rounded_rectangle(bar, radius=8, fill="#2B3448")
    d.rounded_rectangle((bar[0], bar[1], int(lerp(bar[0], bar[2], 0.72 * ease_out(progress))), bar[3]), radius=8, fill=C["lime"])

    btn = (x1 + pad, y2 - 78, x1 + pad + 220, y2 - 34)
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow, "RGBA")
    gd.rounded_rectangle(btn, radius=16, fill=rgba(C["lime"], 70))
    glow = glow.filter(ImageFilter.GaussianBlur(12))
    layer.alpha_composite(glow)
    d.rounded_rectangle(btn, radius=16, fill=C["lime"])
    text(d, ((btn[0] + btn[2]) / 2, (btn[1] + btn[3]) / 2 - 1), "Start today's drill", F["small_b"], C["bg"], anchor="mm")


def scene_problem(p):
    img = draw_background()
    d = ImageDraw.Draw(img, "RGBA")
    fade = ease_out(clamp(p / 0.18))
    text(d, (72, 72), "Bahasa I2 prep had\ncontent everywhere.", F["display"], C["white"], alpha=int(255 * fade))
    draw_materials(img, progress=ease_out(p), drift=0)
    return img


def scene_reveal(p):
    img = draw_background()
    d = ImageDraw.Draw(img, "RGBA")
    draw_materials(img, progress=1, drift=8 * math.sin(p * math.pi), dim=0.55)
    panel = (246, 180, 1034, 390)
    shadow(img, panel, radius=32, blur=24, alpha=110)
    rounded(d, panel, rgba(C["panel"], 245), outline=rgba(C["line"], 230), radius=32, width=2)
    text(d, (640, 248), "The gap was practice,\nnot content.", F["headline"], C["white"], anchor="mm")
    text(d, (640, 336), "Reading materials was not the same as repeatable exam practice.", F["body"], C["cyan"], anchor="mm")
    return img


def scene_transform(p):
    img = draw_background()
    d = ImageDraw.Draw(img, "RGBA")
    text(d, (72, 72), "Scattered inputs become\npractice modules.", F["headline"], C["white"])
    pull = ease_in_out(clamp((p - 0.05) / 0.55))
    draw_materials(img, progress=1, dim=0.1 * pull, pull=pull)
    hub(img, (640, 360), scale=0.9 + 0.1 * ease_out(p), glow=0.4 + 0.5 * math.sin(p * math.pi))

    modules = [
        ((86, 500, 346, 582), "Vocabulary drills", "Meaning and usage", C["lime"]),
        ((380, 500, 640, 582), "Comprehension practice", "Read, answer, repeat", C["cyan"]),
        ((674, 500, 934, 582), "Grammar questions", "Sentence structure", C["lime"]),
        ((968, 500, 1194, 582), "Speaking prompts", "Prepare responses", C["cyan"]),
        ((480, 610, 800, 684), "Weak-area review", "Return to what needs work", C["lime"]),
    ]
    for i, (box, label, detail, accent) in enumerate(modules):
        module_card(img, box, label, detail, clamp((p - 0.48) * 3.4 - i * 0.16), accent)
    return img


def scene_dashboard(p):
    img = draw_background()
    d = ImageDraw.Draw(img, "RGBA")
    title_bottom = paragraph(d, (72, 78), "From scattered materials to repeatable practice.", F["headline"], C["white"], 455, line_gap=4)
    paragraph(d, (76, title_bottom + 18), "A quick drill surface for the next small pocket of time.", F["body"], C["cyan"], 390)
    scale = 0.94 + 0.06 * ease_out(p)
    box = (548, 88, 1215, 610)
    cx, cy = (box[0] + box[2]) / 2, (box[1] + box[3]) / 2
    w, h = (box[2] - box[0]) * scale, (box[3] - box[1]) * scale
    scaled = (int(cx - w / 2), int(cy - h / 2), int(cx + w / 2), int(cy + h / 2))
    dashboard(img, scaled, progress=p)
    pill(d, (76, 620, 236, 660), "Pick a module", "#172033", C["white"], F["tiny"])
    pill(d, (254, 620, 388, 660), "Practise", C["lime"], C["bg"], F["tiny"])
    pill(d, (406, 620, 552, 660), "Continue later", "#172033", C["white"], F["tiny"])
    return img


def scene_end(p):
    img = draw_background()
    d = ImageDraw.Draw(img, "RGBA")
    hub(img, (640, 245), scale=1.18, glow=0.55)
    text(d, (640, 372), "KataPult", F["display"], C["white"], anchor="mm")
    text(d, (640, 438), "Practise smarter for Bahasa I2.", F["title"], C["cyan"], anchor="mm")
    text(d, (640, 512), "Scattered materials into repeatable practice.", F["body_b"], C["white"], anchor="mm")
    pill(d, (516, 586, 764, 632), "Start today's drill", C["lime"], C["bg"], F["small_b"])
    text(d, (640, 670), "frazer-tay.github.io/KataPult", F["small_b"], C["muted"], anchor="mm")
    return img


SCENES = [
    (0.0, 1.7, scene_problem),
    (1.7, 3.0, scene_reveal),
    (3.0, 5.1, scene_transform),
    (5.1, 7.7, scene_dashboard),
    (7.7, 9.6, scene_end),
]


def render_at(t):
    for i, (start, end, painter) in enumerate(SCENES):
        if start <= t <= end or i == len(SCENES) - 1:
            p = clamp((t - start) / (end - start))
            frame = painter(p)
            transition = 0 if i == 1 else 0.16
            if i < len(SCENES) - 1 and end - t < transition:
                next_painter = SCENES[i + 1][2]
                alpha = ease_in_out((transition - (end - t)) / transition)
                frame = Image.blend(frame, next_painter(0), alpha)
            return frame.convert("RGB")
    return draw_background().convert("RGB")


def save_outputs():
    if FRAME_DIR.exists():
        shutil.rmtree(FRAME_DIR)
    FRAME_DIR.mkdir(parents=True, exist_ok=True)
    PACKAGE.mkdir(parents=True, exist_ok=True)

    try:
        import imageio.v2 as imageio

        writer = imageio.get_writer(MP4_PATH, fps=MP4_FPS, codec="libx264", quality=8, macro_block_size=16)
    except Exception:
        writer = None

    total = int(DURATION * MP4_FPS)
    gif_frames = []
    sample_every = MP4_FPS // GIF_FPS
    for i in range(total):
        t = i / MP4_FPS
        frame = render_at(t)
        if writer:
            writer.append_data(np.asarray(frame))
        if i % sample_every == 0:
            path = FRAME_DIR / f"{len(gif_frames) + 1:03d}.png"
            frame.save(path, quality=95)
            gif_frames.append(frame)
    if writer:
        writer.close()

    palette_frames = [frame.convert("P", palette=Image.ADAPTIVE, colors=128) for frame in gif_frames]
    palette_frames[0].save(
        GIF_PATH,
        save_all=True,
        append_images=palette_frames[1:],
        duration=int(1000 / GIF_FPS),
        loop=0,
        optimize=True,
        disposal=2,
    )
    return GIF_PATH, MP4_PATH if MP4_PATH.exists() else None, FRAME_DIR, len(gif_frames), DURATION


if __name__ == "__main__":
    gif, mp4, frames, frame_count, duration = save_outputs()
    print(gif)
    print(mp4)
    print(frames)
    print(f"gif_frames={frame_count}")
    print(f"duration_s={duration}")
