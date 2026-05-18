from pathlib import Path
import math
import shutil

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
PACKAGE = ROOT / "product-showcase-package"
ASSET_DIR = PACKAGE / "govtech_screenshots"
OUT_DIR = PACKAGE / "katapult_govtech_quality_gif"
FRAME_DIR = OUT_DIR / "frames"
GIF_PATH = PACKAGE / "KataPult_GovTech_Quality_Product_Walkthrough.gif"
CONTACT_PATH = OUT_DIR / "_contact_sheet.png"

W, H = 1280, 720
FPS = 12
DURATION = 18.0

COL = {
    "paper": "#F7F5EF",
    "white": "#FFFFFF",
    "ink": "#17202C",
    "muted": "#576377",
    "subtle": "#87909F",
    "line": "#D9D4C8",
    "soft": "#EEEAE1",
    "soft2": "#FBFAF7",
    "green": "#6F9F2A",
    "green_soft": "#EEF6E8",
    "teal": "#1F6D78",
    "teal_soft": "#E7F4F4",
    "amber": "#C88A2C",
    "amber_soft": "#FFF4DF",
    "purple": "#2A1B54",
}


def font(size, weight="regular"):
    paths = {
        "regular": ["C:/Windows/Fonts/segoeui.ttf", "C:/Windows/Fonts/calibri.ttf"],
        "bold": ["C:/Windows/Fonts/segoeuib.ttf", "C:/Windows/Fonts/calibrib.ttf"],
        "display": ["C:/Windows/Fonts/bahnschrift.ttf", "C:/Windows/Fonts/segoeuisl.ttf"],
    }
    for p in paths.get(weight, paths["regular"]):
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


F = {
    "brand": font(15, "bold"),
    "eyebrow": font(13, "bold"),
    "hero": font(43, "display"),
    "h1": font(34, "display"),
    "h2": font(22, "bold"),
    "body": font(17, "regular"),
    "body_b": font(17, "bold"),
    "small": font(13, "regular"),
    "small_b": font(13, "bold"),
    "tiny": font(11, "regular"),
    "metric": font(32, "display"),
}


def rgb(hex_color):
    hex_color = hex_color.lstrip("#")
    return tuple(int(hex_color[i : i + 2], 16) for i in (0, 2, 4))


def rgba(hex_color, alpha=255):
    return rgb(hex_color) + (max(0, min(255, int(alpha))),)


def clamp(v, lo=0.0, hi=1.0):
    return max(lo, min(hi, v))


def ease(t):
    t = clamp(t)
    return t * t * (3 - 2 * t)


def ease_out(t):
    t = clamp(t)
    return 1 - (1 - t) ** 3


def ease_in_out(t):
    t = clamp(t)
    return 0.5 - 0.5 * math.cos(math.pi * t)


def lerp(a, b, t):
    return a + (b - a) * t


def box_lerp(a, b, t):
    return tuple(int(lerp(a[i], b[i], t)) for i in range(4))


def draw_text(draw, xy, text, fnt, fill, anchor=None, align="left", max_width=None, gap=4):
    if max_width is None:
        draw.text(xy, text, font=fnt, fill=fill, anchor=anchor)
        return xy[1] + fnt.size
    x, y = xy
    lines = wrap(draw, text, fnt, max_width)
    for line in lines:
        if align == "center":
            draw.text((x + max_width / 2, y), line, font=fnt, fill=fill, anchor="ma")
        else:
            draw.text((x, y), line, font=fnt, fill=fill)
        y += fnt.size + gap
    return y


def wrap(draw, text, fnt, max_width):
    lines, cur = [], ""
    for raw in str(text).split("\n"):
        cur = ""
        for word in raw.split():
            cand = (cur + " " + word).strip()
            if draw.textbbox((0, 0), cand, font=fnt)[2] <= max_width:
                cur = cand
            else:
                if cur:
                    lines.append(cur)
                cur = word
        if cur:
            lines.append(cur)
    return lines or [""]


def rounded(draw, box, fill, outline=None, radius=18, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def shadow(layer, box, radius=22, blur=18, alpha=28):
    sh = Image.new("RGBA", layer.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(sh, "RGBA")
    sd.rounded_rectangle(box, radius=radius, fill=(30, 30, 30, alpha))
    sh = sh.filter(ImageFilter.GaussianBlur(blur))
    layer.alpha_composite(sh)


def base():
    img = Image.new("RGBA", (W, H), rgba(COL["paper"]))
    d = ImageDraw.Draw(img, "RGBA")
    # Very quiet grid, enough to make the piece feel ordered.
    for x in range(72, W - 50, 148):
        d.line((x, 86, x, H - 50), fill=rgba(COL["line"], 24), width=1)
    d.line((56, 68, W - 56, 68), fill=rgba(COL["line"], 180), width=1)
    draw_text(d, (58, 34), "KataPult", F["brand"], rgba(COL["ink"]))
    draw_text(d, (146, 35), "Bahasa Indo Practice Companion", F["tiny"], rgba(COL["subtle"]))
    return img


def image_asset(name):
    p = ASSET_DIR / name
    if not p.exists():
        raise FileNotFoundError(p)
    return Image.open(p).convert("RGBA")


def fit_cover(im, size):
    target_w, target_h = size
    scale = max(target_w / im.width, target_h / im.height)
    nw, nh = int(im.width * scale), int(im.height * scale)
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    return im.crop(((nw - target_w) // 2, (nh - target_h) // 2, (nw + target_w) // 2, (nh + target_h) // 2))


def fit_contain(im, size, fill="#FFFFFF"):
    canvas = Image.new("RGBA", size, rgba(fill))
    im = im.copy()
    im.thumbnail(size, Image.Resampling.LANCZOS)
    canvas.alpha_composite(im, ((size[0] - im.width) // 2, (size[1] - im.height) // 2))
    return canvas


def browser(layer, box, shot_name, mode="cover", alpha=1.0, radius=22):
    a = int(255 * clamp(alpha))
    x1, y1, x2, y2 = box
    if a <= 0:
        return
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    shadow(overlay, box, radius=radius, blur=20, alpha=int(32 * alpha))
    d = ImageDraw.Draw(overlay, "RGBA")
    rounded(d, box, rgba(COL["white"], a), outline=rgba(COL["line"], a), radius=radius, width=1)
    rounded(d, (x1, y1, x2, y1 + 36), rgba("#E9ECEF", a), radius=radius)
    for i, c in enumerate(["#E36F66", "#E2B646", "#55B983"]):
        d.ellipse((x1 + 18 + i * 22, y1 + 13, x1 + 29 + i * 22, y1 + 24), fill=rgba(c, a))
    d.rounded_rectangle((x1 + 132, y1 + 14, x2 - 24, y1 + 24), radius=5, fill=rgba("#D5DCE3", a))
    content_box = (x2 - x1 - 24, y2 - y1 - 50)
    im = image_asset(shot_name)
    shot = fit_cover(im, content_box) if mode == "cover" else fit_contain(im, content_box, COL["white"])
    if alpha < 1:
        shot.putalpha(shot.getchannel("A").point(lambda v: int(v * alpha)))
    overlay.alpha_composite(shot, (x1 + 12, y1 + 42))
    layer.alpha_composite(overlay)


def chip(draw, box, label, alpha=1.0, accent=None):
    a = int(255 * clamp(alpha))
    accent = accent or COL["green"]
    rounded(draw, box, rgba(COL["white"], a), outline=rgba(COL["line"], a), radius=15, width=1)
    draw.rounded_rectangle((box[0] + 14, box[1] + 12, box[0] + 20, box[3] - 12), radius=3, fill=rgba(accent, a))
    draw_text(draw, (box[0] + 34, box[1] + 13), label, F["small_b"], rgba(COL["ink"], a))


def cursor(draw, x, y, alpha=1.0):
    a = int(255 * clamp(alpha))
    pts = [(x, y), (x, y + 34), (x + 10, y + 26), (x + 18, y + 44), (x + 28, y + 39), (x + 19, y + 22), (x + 32, y + 22)]
    draw.polygon(pts, fill=rgba(COL["ink"], a))
    draw.line(pts + [pts[0]], fill=rgba(COL["white"], a), width=1)


def callout(draw, box, title, body, accent=COL["green"], alpha=1.0):
    a = int(255 * clamp(alpha))
    rounded(draw, box, rgba(COL["white"], a), outline=rgba(COL["line"], a), radius=18, width=1)
    draw.line((box[0] + 22, box[1] + 22, box[0] + 22, box[3] - 22), fill=rgba(accent, a), width=5)
    draw_text(draw, (box[0] + 46, box[1] + 20), title, F["h2"], rgba(COL["ink"], a))
    draw_text(draw, (box[0] + 46, box[1] + 56), body, F["small"], rgba(COL["muted"], a), max_width=box[2] - box[0] - 76, gap=3)


def scene_problem(p):
    img = base()
    d = ImageDraw.Draw(img, "RGBA")
    draw_text(d, (58, 124), "The material\nwas already there.", F["hero"], rgba(COL["ink"]), max_width=430, gap=6)
    draw_text(d, (58, 252), "The harder part was deciding where to continue.", F["body"], rgba(COL["muted"]))

    starts = [
        (-220, 334, -4, 380),
        (100, 760, 316, 806),
        (-180, 488, 36, 534),
        (388, 780, 604, 826),
        (116, -70, 372, -24),
        (520, 828, 736, 874),
    ]
    ends = [
        (72, 340, 326, 386),
        (132, 416, 340, 462),
        (70, 496, 324, 542),
        (374, 348, 588, 394),
        (402, 426, 680, 472),
        (334, 516, 548, 562),
    ]
    labels = ["Online references", "Study notes", "Screenshots", "Recall packs", "Generated material", "Raw lists"]
    accents = [COL["green"], COL["teal"], COL["amber"], COL["green"], COL["teal"], COL["amber"]]
    for i, label in enumerate(labels):
        t = ease_out(p * 1.55 - i * 0.07)
        if t > 0:
            chip(d, box_lerp(starts[i], ends[i], t), label, t, accents[i])

    card_a = ease_out((p - 0.28) / 0.32)
    if card_a > 0:
        callout(d, (760, 238, 1180, 354), "Where do I start today?", "Materials existed, but the next practice action was unclear.", COL["teal"], card_a)
    pill_a = ease_out((p - 0.62) / 0.22)
    if pill_a > 0:
        rounded(d, (808, 428, 1134, 492), rgba(COL["amber_soft"], int(255 * pill_a)), outline=rgba("#E6C07A", int(255 * pill_a)), radius=18)
        draw_text(d, (970, 451), "Too much setup before practice", F["body_b"], rgba(COL["ink"], int(255 * pill_a)), anchor="ma")
    return img


def scene_centralise(p):
    img = base()
    d = ImageDraw.Draw(img, "RGBA")
    draw_text(d, (58, 118), "Centralise relevant\nlearning materials.", F["hero"], rgba(COL["ink"]), max_width=470, gap=6)
    draw_text(d, (58, 248), "One platform routes content into practice flows.", F["body"], rgba(COL["muted"]))

    labels = ["Notes", "References", "Recall packs", "Generated practice material"]
    start = [(78, 342 + i * 58, 334, 386 + i * 58) for i in range(4)]
    sink = [(460, 308 + i * 16, 680, 350 + i * 16) for i in range(4)]
    for i, label in enumerate(labels):
        t = ease_out((p - i * 0.05) / 0.48)
        fade = 1 - clamp((p - 0.58) / 0.18)
        chip(d, box_lerp(start[i], sink[i], t), label, fade, [COL["green"], COL["teal"], COL["amber"], COL["green"]][i])

    rounded(d, (430, 276, 690, 404), COL["white"], outline=COL["line"], radius=20)
    draw_text(d, (560, 316), "KataPult", F["h1"], rgba(COL["green"]), anchor="ma")
    draw_text(d, (560, 362), "organises content", F["small_b"], rgba(COL["ink"]), anchor="ma")

    arrow_a = ease_out((p - 0.34) / 0.22)
    if arrow_a > 0:
        d.line((696, 340, 752, 340), fill=rgba(COL["green"], int(255 * arrow_a)), width=4)
        d.polygon([(752, 340), (738, 331), (738, 349)], fill=rgba(COL["green"], int(255 * arrow_a)))

    panel_a = ease_out((p - 0.44) / 0.38)
    if panel_a > 0:
        x1, y1, x2, y2 = 782, 142, 1182, 636
        shadow(img, (x1, y1, x2, y2), blur=18, alpha=int(28 * panel_a), radius=24)
        rounded(d, (x1, y1, x2, y2), rgba(COL["white"], int(255 * panel_a)), outline=rgba(COL["line"], int(255 * panel_a)), radius=24)
        draw_text(d, (x1 + 34, y1 + 34), "Reusable study set", F["h1"], rgba(COL["ink"], int(255 * panel_a)))
        draw_text(d, (x1 + 34, y1 + 82), "Cards, drills and quizzes from one topic", F["small"], rgba(COL["muted"], int(255 * panel_a)))
        rows = [
            ("Daily challenge", "Continue practice"),
            ("Component drills", "Vocab, forms, synonyms"),
            ("Answer feedback", "Result plus explanation"),
            ("Writing guides", "Phrases and examples"),
        ]
        for i, (h, b) in enumerate(rows):
            row_a = ease_out(panel_a * 1.4 - i * 0.14)
            if row_a <= 0:
                continue
            yy = y1 + 140 + i * 66
            rounded(d, (x1 + 34, yy, x2 - 34, yy + 48), rgba(COL["soft2"], int(255 * row_a)), outline=rgba(COL["line"], int(255 * row_a)), radius=14)
            draw_text(d, (x1 + 54, yy + 10), h, F["small_b"], rgba(COL["ink"], int(255 * row_a)))
            draw_text(d, (x1 + 220, yy + 12), b, F["small"], rgba(COL["muted"], int(255 * row_a)))
        rounded(d, (x1 + 34, y2 - 58, x2 - 34, y2 - 46), rgba(COL["soft"], int(255 * panel_a)), radius=6)
        rounded(d, (x1 + 34, y2 - 58, int(x1 + 34 + 210 * panel_a), y2 - 46), rgba(COL["green"], int(255 * panel_a)), radius=6)
    return img


def scene_walkthrough(p):
    img = base()
    d = ImageDraw.Draw(img, "RGBA")
    draw_text(d, (58, 116), "Practise, then\nunderstand.", F["hero"], rgba(COL["ink"]), max_width=500, gap=6)
    draw_text(d, (58, 238), "A short path from answer to feedback.", F["body"], rgba(COL["muted"]))

    stages = [
        ("01-home-real.png", "Choose a mode", "Home gives a clear starting point.", "cover"),
        ("06-custom-test-real.png", "Focus the practice", "Custom test targets selected components.", "cover"),
        ("04-imbuhan-real-explanation-focused.png", "Answer and understand", "Feedback shows the result, then explains the rule.", "contain"),
    ]
    segf = p * len(stages)
    seg = min(len(stages) - 1, int(segf))
    local = segf - seg
    shot, title, body, mode = stages[seg]
    if seg > 0 and local < 0.15:
        browser(img, (506, 104, 1194, 610), stages[seg - 1][0], stages[seg - 1][3], alpha=1 - local / 0.15)
    zoom = 1 + 0.012 * math.sin(local * math.pi)
    box = (int(506 - 344 * (zoom - 1)), int(104 - 253 * (zoom - 1)), int(1194 + 344 * (zoom - 1)), int(610 + 253 * (zoom - 1)))
    browser(img, box, shot, mode, alpha=clamp(local / 0.15) if seg > 0 and local < 0.15 else 1)

    callout(d, (58, 354, 426, 456), title, body, [COL["green"], COL["teal"], COL["amber"]][seg], 1)
    steps = ["Open", "Select", "Answer", "Explain"]
    for i, label in enumerate(steps):
        x = 58 + i * 86
        active = i <= (0 if seg == 0 else 1 if seg == 1 else 3)
        rounded(d, (x, 512, x + 70, 544), COL["green"] if active else COL["soft"], radius=10)
        draw_text(d, (x + 35, 522), label, F["tiny"], rgba(COL["white"] if active else COL["muted"]), anchor="ma")

    if seg < 2:
        cursor(d, int(826 + 230 * ease_in_out(local)), int(452 + 18 * math.sin(local * math.pi)), 0.92)
    else:
        # Keep the explanation emphasis quiet; the actual product state should stay primary.
        a = ease_out((local - 0.22) / 0.22)
        if a > 0:
            rounded(d, (1010, 500, 1182, 558), rgba(COL["white"], int(245 * a)), outline=rgba(COL["line"], int(220 * a)), radius=14, width=1)
            d.line((1002, 530, 968, 554), fill=rgba(COL["teal"], int(190 * a)), width=2)
            d.ellipse((962, 550, 970, 558), fill=rgba(COL["teal"], int(220 * a)))
            draw_text(d, (1026, 514), "AI-assisted note", F["small_b"], rgba(COL["ink"], int(255 * a)))
            draw_text(d, (1026, 535), "appears after feedback", F["tiny"], rgba(COL["muted"], int(255 * a)))
    return img


def scene_breadth(p):
    img = base()
    d = ImageDraw.Draw(img, "RGBA")
    draw_text(d, (58, 112), "Practice is grouped into clear areas.", F["hero"], rgba(COL["ink"]), max_width=820)
    draw_text(d, (58, 178), "Each area has a specific role.", F["body"], rgba(COL["muted"]))

    cols = [
        ("Drill", "Vocabulary\nImbuhan\nPersamaan", "Build words and synonym precision.", COL["green"]),
        ("Test", "Daily challenge\nCustom test", "Create short practice sessions.", COL["teal"]),
        ("Write", "Karangan\nEssay recall packs\nSurat Resmi", "Use phrases, examples and guides.", COL["amber"]),
    ]
    for i, (h, list_text, body, accent) in enumerate(cols):
        t = ease_out(p * 1.35 - i * 0.16)
        if t <= 0:
            continue
        x = int(76 + i * 390)
        y = int(284 + (1 - t) * 28)
        rounded(d, (x, y, x + 342, y + 258), rgba(COL["white"], int(255 * t)), outline=rgba(COL["line"], int(255 * t)), radius=22)
        d.line((x + 26, y + 28, x + 26, y + 228), fill=rgba(accent, int(255 * t)), width=6)
        draw_text(d, (x + 56, y + 26), h, F["h1"], rgba(COL["ink"], int(255 * t)))
        draw_text(d, (x + 58, y + 84), list_text, F["body_b"], rgba(COL["ink"], int(255 * t)), max_width=250, gap=8)
        draw_text(d, (x + 58, y + 178), body, F["small"], rgba(COL["muted"], int(255 * t)), max_width=238, gap=4)

    return img


def scene_close(p):
    img = base()
    d = ImageDraw.Draw(img, "RGBA")
    draw_text(d, (74, 122), "KataPult helps organise revision\ninto daily practice.", F["hero"], rgba(COL["ink"]), max_width=900, gap=6)
    draw_text(d, (76, 258), "A working prototype for shorter, more structured Bahasa Indo revision.", F["body"], rgba(COL["muted"]))
    points = [
        ("Continue easily", "A clear place to resume"),
        ("Practise weak areas", "Focused drills and tests"),
        ("Understand answers", "Feedback with AI notes"),
    ]
    for i, (h, b) in enumerate(points):
        t = ease_out(p * 1.45 - i * 0.13)
        if t <= 0:
            continue
        x = 80 + i * 382
        y = int(408 + (1 - t) * 24)
        callout(d, (x, y, x + 330, y + 118), h, b, [COL["green"], COL["teal"], COL["amber"]][i], t)
    if p > 0.7:
        a = ease_out((p - 0.7) / 0.22)
        rounded(d, (232, 604, 1048, 650), rgba(COL["green_soft"], int(255 * a)), outline=rgba("#C6DBB4", int(255 * a)), radius=16)
        draw_text(d, (640, 618), "Next: review content and refine with user feedback.", F["small_b"], rgba(COL["ink"], int(255 * a)), anchor="ma")
    return img


SCENES = [
    (0.0, 3.4, scene_problem),
    (3.4, 6.9, scene_centralise),
    (6.9, 12.4, scene_walkthrough),
    (12.4, 15.4, scene_breadth),
    (15.4, 18.0, scene_close),
]


def render_at(t):
    for i, (start, end, painter) in enumerate(SCENES):
        if start <= t <= end or i == len(SCENES) - 1:
            p = clamp((t - start) / (end - start))
            return painter(p).convert("RGB")
    return base().convert("RGB")


def contact_sheet(sample_paths):
    tw, th = 320, 180
    pad = 18
    sheet = Image.new("RGB", (4 * tw + 5 * pad, 2 * (th + 30) + 3 * pad), "white")
    d = ImageDraw.Draw(sheet)
    for i, path in enumerate(sample_paths[:8]):
        im = Image.open(path).convert("RGB")
        im.thumbnail((tw, th), Image.Resampling.LANCZOS)
        x = pad + (i % 4) * (tw + pad)
        y = pad + (i // 4) * (th + 30 + pad)
        sheet.paste(im, (x, y))
        draw_text(d, (x, y + th + 6), path.name, F["tiny"], (80, 80, 80))
    sheet.save(CONTACT_PATH, quality=95)


def main():
    if OUT_DIR.exists():
        shutil.rmtree(OUT_DIR)
    FRAME_DIR.mkdir(parents=True, exist_ok=True)

    frames = []
    sample_paths = []
    total = int(DURATION * FPS)
    sample_indices = {0, 18, 42, 70, 96, 128, 160, total - 1}

    for i in range(total):
        frame = render_at(i / FPS)
        frame_path = FRAME_DIR / f"{i + 1:03d}.png"
        frame.save(frame_path, quality=95)
        frames.append(frame.convert("P", palette=Image.ADAPTIVE, colors=192))
        if i in sample_indices:
            sample_paths.append(frame_path)

    frames[0].save(
        GIF_PATH,
        save_all=True,
        append_images=frames[1:],
        duration=int(1000 / FPS),
        loop=0,
        optimize=False,
        disposal=2,
    )
    contact_sheet(sample_paths)
    print(GIF_PATH.resolve())
    print(CONTACT_PATH.resolve())
    print(FRAME_DIR.resolve())
    print(f"frames={len(frames)} fps={FPS} duration={DURATION}s size={W}x{H} bytes={GIF_PATH.stat().st_size}")


if __name__ == "__main__":
    main()
