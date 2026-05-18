from pathlib import Path
import math
import shutil

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "award-demo-assets"
PACKAGE = ROOT / "product-showcase-package"
FRAME_DIR = PACKAGE / "top3_feature_teaser_frames"
GIF_PATH = PACKAGE / "KataPult_Top3_Feature_Teaser.gif"
MP4_PATH = PACKAGE / "KataPult_Top3_Feature_Teaser.mp4"

W, H = 1280, 720
FPS_MP4 = 24
FPS_GIF = 12
DURATION = 10.0

C = {
    "bg": "#070A18",
    "bg2": "#0A1328",
    "panel": "#101827",
    "panel2": "#131F33",
    "line": "#2E3B53",
    "muted": "#9BA8BA",
    "white": "#FFFFFF",
    "lime": "#A9D83A",
    "lime2": "#D5F579",
    "cyan": "#65D6E6",
    "cyan2": "#BFF6FF",
    "ink": "#111827",
    "soft": "#EDF2F7",
}


def font(size, weight="regular"):
    paths = {
        "light": ["C:/Windows/Fonts/segoeuisl.ttf", "C:/Windows/Fonts/segoeuil.ttf", "C:/Windows/Fonts/calibril.ttf"],
        "regular": ["C:/Windows/Fonts/segoeui.ttf", "C:/Windows/Fonts/calibri.ttf", "C:/Windows/Fonts/arial.ttf"],
        "bold": ["C:/Windows/Fonts/segoeuib.ttf", "C:/Windows/Fonts/calibrib.ttf", "C:/Windows/Fonts/arialbd.ttf"],
    }
    for candidate in paths.get(weight, paths["regular"]):
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


F = {
    "display": font(50, "light"),
    "hero": font(44, "light"),
    "h1": font(38, "light"),
    "h2": font(25, "bold"),
    "body": font(19, "regular"),
    "body_b": font(19, "bold"),
    "small": font(14, "regular"),
    "small_b": font(14, "bold"),
    "tiny": font(12, "regular"),
    "metric": font(30, "bold"),
}

COUNTS = {
    "Vocabulary": 583,
    "Imbuhan": 666,
    "Persamaan": 305,
    "Karangan": 297,
    "Surat rasmi": 8,
    "Flashcards": 23,
    "Custom tests": 971,
    "Daily pool": 1554,
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


def rounded(draw, box, fill, outline=None, radius=18, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def text(draw, xy, value, fnt, fill, anchor=None, alpha=255):
    color = rgba(fill, alpha) if isinstance(fill, str) else fill
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


def paragraph(draw, xy, value, fnt, fill, max_width, gap=6, alpha=255):
    x, y = xy
    for line in wrap_lines(draw, value, fnt, max_width):
        text(draw, (x, y), line, fnt, fill, alpha=alpha)
        y += fnt.size + gap
    return y


def shadow(layer, box, radius=20, blur=16, alpha=90):
    sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sh, "RGBA")
    sd.rounded_rectangle(box, radius=radius, fill=(0, 0, 0, alpha))
    sh = sh.filter(ImageFilter.GaussianBlur(blur))
    layer.alpha_composite(sh)


def background():
    img = Image.new("RGBA", (W, H), rgba(C["bg"]))
    d = ImageDraw.Draw(img, "RGBA")
    for y in range(H):
        k = y / (H - 1)
        c1, c2 = rgb(C["bg2"]), rgb(C["bg"])
        color = tuple(int(lerp(c1[i], c2[i], k)) for i in range(3)) + (255,)
        d.line((0, y, W, y), fill=color)
    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid, "RGBA")
    for x in range(0, W, 112):
        gd.line((x, 0, x, H), fill=(255, 255, 255, 4), width=1)
    for y in range(0, H, 112):
        gd.line((0, y, W, y), fill=(255, 255, 255, 4), width=1)
    gd.ellipse((820, -170, 1350, 280), fill=rgba("#102348", 72))
    gd.ellipse((-180, 470, 300, 880), fill=rgba("#11243D", 76))
    img.alpha_composite(grid)
    return img


def label(draw, xy, value, active=False):
    x, y = xy
    fill = C["lime"] if active else "#172033"
    fg = C["bg"] if active else C["white"]
    bbox = draw.textbbox((0, 0), value, font=F["tiny"])
    w = bbox[2] - bbox[0] + 28
    rounded(draw, (x, y, x + w, y + 32), fill, outline="#2E3B53" if not active else None, radius=11)
    text(draw, (x + 14, y + 8), value, F["tiny"], fg)
    return x + w


def shot(name, size):
    im = Image.open(ASSETS / name).convert("RGBA")
    im.thumbnail(size)
    canvas = Image.new("RGBA", size, rgba(C["white"]))
    canvas.alpha_composite(im, ((size[0] - im.width) // 2, (size[1] - im.height) // 2))
    return canvas


def browser(layer, box, screenshot, scale=1, glow=False):
    x1, y1, x2, y2 = box
    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2
    w, h = (x2 - x1) * scale, (y2 - y1) * scale
    x1, y1, x2, y2 = int(cx - w / 2), int(cy - h / 2), int(cx + w / 2), int(cy + h / 2)
    if glow:
        gl = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        gd = ImageDraw.Draw(gl, "RGBA")
        gd.rounded_rectangle((x1 - 8, y1 - 8, x2 + 8, y2 + 8), radius=28, outline=rgba(C["cyan"], 80), width=3)
        gl = gl.filter(ImageFilter.GaussianBlur(10))
        layer.alpha_composite(gl)
    shadow(layer, (x1, y1, x2, y2), radius=24, blur=20, alpha=115)
    d = ImageDraw.Draw(layer, "RGBA")
    rounded(d, (x1, y1, x2, y2), C["white"], outline="#2A3650", radius=24, width=1)
    rounded(d, (x1, y1, x2, y1 + 40), C["soft"], radius=24)
    for i, col in enumerate(["#F87171", "#FACC15", "#34D399"]):
        d.ellipse((x1 + 22 + i * 24, y1 + 14, x1 + 34 + i * 24, y1 + 26), fill=col)
    d.rounded_rectangle((x1 + 144, y1 + 14, x2 - 30, y1 + 28), radius=7, fill="#DDE5EF")
    content = shot(screenshot, (x2 - x1 - 28, y2 - y1 - 54))
    layer.alpha_composite(content, (x1 + 14, y1 + 46))
    return (x1, y1, x2, y2)


def feature_header(draw, number, title, subcopy):
    rounded(draw, (72, 78, 122, 112), C["lime"], radius=10)
    text(draw, (97, 94), number, F["small_b"], C["bg"], anchor="mm")
    paragraph(draw, (72, 138), title, F["hero"], C["white"], 440, gap=4)
    paragraph(draw, (76, 248), subcopy, F["body"], C["cyan"], 420, gap=5)


def metric_card(draw, box, value, label_text):
    rounded(draw, box, "#101827", outline=C["line"], radius=16)
    text(draw, (box[0] + 18, box[1] + 12), value, F["metric"], C["lime"])
    text(draw, (box[0] + 18, box[1] + 50), label_text, F["small"], C["muted"])


def formula_box(draw, box, title, formula, accent=C["cyan"]):
    rounded(draw, box, "#101827", outline=C["line"], radius=15)
    draw.rounded_rectangle((box[0] + 16, box[1] + 16, box[0] + 21, box[3] - 16), radius=3, fill=accent)
    text(draw, (box[0] + 38, box[1] + 12), title, F["small_b"], C["white"])
    text(draw, (box[0] + 38, box[1] + 39), formula, F["tiny"], C["muted"])


def scale_card(draw, box, value, label_text, active=False):
    fill = "#142134" if active else "#101827"
    outline = C["lime"] if active else C["line"]
    rounded(draw, box, fill, outline=outline, radius=15)
    text(draw, (box[0] + 16, box[1] + 10), value, F["metric"], C["lime"] if active else C["white"])
    text(draw, (box[0] + 16, box[1] + 47), label_text, F["small"], C["muted"])


def scale_grid(draw, x, y, active_label=None):
    items = [
        ("583", "Vocabulary"),
        ("666", "Imbuhan"),
        ("305", "Persamaan"),
        ("297", "Karangan"),
        ("8", "Surat rasmi sections"),
        ("23", "Flashcard sets"),
    ]
    for i, (value, label_text) in enumerate(items):
        col = i % 2
        row = i // 2
        box = (x + col * 178, y + row * 82, x + col * 178 + 158, y + row * 82 + 66)
        scale_card(draw, box, value, label_text, active=label_text.startswith(active_label or "___"))


def module_tile(layer, box, title, detail, active=False):
    d = ImageDraw.Draw(layer, "RGBA")
    fill = "#121C30" if not active else "#172334"
    outline = C["line"] if not active else C["lime"]
    rounded(d, box, fill, outline=outline, radius=16, width=1)
    d.rounded_rectangle((box[0] + 18, box[1] + 18, box[0] + 24, box[3] - 18), radius=3, fill=C["lime"] if active else "#53627A")
    text(d, (box[0] + 42, box[1] + 15), title, F["body_b"], C["white"])
    text(d, (box[0] + 42, box[1] + 44), detail, F["small"], C["muted"])


def scene_open(p):
    img = background()
    d = ImageDraw.Draw(img, "RGBA")
    paragraph(d, (72, 84), "KataPult", F["display"], C["white"], 520)
    paragraph(d, (76, 160), "Bahasa I2 practice by component.", F["h2"], C["cyan"], 520)
    paragraph(d, (76, 222), "Two practice pools, counted differently.", F["body"], C["muted"], 500)
    scale_card(d, (76, 282, 232, 354), "1,554*", "drill / daily pool")
    scale_card(d, (252, 282, 408, 354), "971**", "custom-test bank")
    scale_card(d, (76, 374, 232, 446), "23", "flashcard sets")
    formula_box(d, (252, 374, 570, 432), "* Drill pool", "583 vocab + 666 imbuhan + 305 persamaan")
    formula_box(d, (252, 448, 570, 506), "** Custom tests", "666 imbuhan + 305 persamaan only", C["lime"])
    labels = ["Modules", "Custom drills", "Daily challenge"]
    for i, name in enumerate(labels):
        if p > 0.18 + i * 0.12:
            label_positions = [(76, 468), (76, 510), (212, 510)]
            label(d, label_positions[i], name, active=i == 0)
    browser(img, (560, 76, 1210, 610), "01-home.png", scale=0.94 + 0.05 * ease_out(p), glow=True)
    text(d, (76, 636), "Top 3 features for repeatable Bahasa I2 prep", F["body_b"], C["white"])
    return img


def scene_modules(p):
    img = background()
    d = ImageDraw.Draw(img, "RGBA")
    feature_header(d, "1", "Component scale,\ncounted clearly.", "Drill items and revision modules are shown separately.")
    cycle = min(2, int(p * 3))
    screenshots = ["02-vocabulary.png", "03-imbuhan.png", "04-persamaan.png"]
    titles = ["Vocabulary", "Imbuhan", "Persamaan"]
    for i, src in enumerate(screenshots):
        offset = i - cycle
        scale = 0.86 if offset else 1.0
        x = int(604 + offset * 82)
        y = int(102 + abs(offset) * 34)
        box = (x, y, x + 568, y + 430)
        if abs(offset) <= 1:
            browser(img, box, src, scale=scale, glow=offset == 0)
    scale_grid(d, 76, 350, active_label=titles[cycle])
    text(d, (76, 618), "* Drill pool = vocabulary + imbuhan + persamaan.", F["tiny"], C["muted"])
    text(d, (76, 640), "Karangan, surat rasmi and flashcards are supporting revision modules.", F["tiny"], C["muted"])
    return img


def scene_drills(p):
    img = background()
    d = ImageDraw.Draw(img, "RGBA")
    feature_header(d, "2", "Custom tests use\n971 items.**", "The custom-test mode draws from question-form components only.")
    browser(img, (560, 84, 1212, 604), "06-test-setup.png", scale=0.98, glow=True)
    scale_card(d, (76, 342, 214, 414), "666", "imbuhan")
    text(d, (228, 366), "+", F["metric"], C["muted"])
    scale_card(d, (262, 342, 400, 414), "305", "persamaan")
    text(d, (414, 366), "=", F["metric"], C["muted"])
    scale_card(d, (448, 342, 548, 414), "971", "items", active=True)
    steps = [
        ("Choose component", "Imbuhan / Persamaan"),
        ("Set drill length", "5, 10, or 20 questions"),
        ("Practise actively", "Answer first, then review"),
    ]
    for i, (title, detail) in enumerate(steps):
        reveal = ease_out(clamp(p * 3 - i * 0.55))
        y = 454 + i * 64 + int((1 - reveal) * 18)
        module_tile(img, (76, y, 430, y + 52), title, detail, active=i == 1)
    rounded(d, (815, 548, 1086, 594), C["lime"], radius=14)
    text(d, (950, 570), "Start focused drill", F["small_b"], C["bg"], anchor="mm")
    return img


def scene_habit(p):
    img = background()
    d = ImageDraw.Draw(img, "RGBA")
    feature_header(d, "3", "Daily challenge uses\n1,554 items.*", "Vocabulary, imbuhan and persamaan feed the daily pool.")
    browser(img, (560, 84, 1212, 604), "07-daily-challenge.png", scale=0.98, glow=True)
    scale_card(d, (76, 344, 214, 416), "583", "vocab")
    scale_card(d, (232, 344, 370, 416), "666", "imbuhan")
    scale_card(d, (388, 344, 526, 416), "305", "persamaan")
    formula_box(d, (76, 442, 526, 500), "* Daily pool", "583 + 666 + 305 = 1,554")
    metric_card(d, (76, 532, 244, 608), "10", "questions/day")
    metric_card(d, (262, 532, 430, 608), "5-10", "minute pockets")
    return img


def scene_close(p):
    img = background()
    d = ImageDraw.Draw(img, "RGBA")
    paragraph(d, (72, 82), "KataPult", F["display"], C["white"], 620)
    paragraph(d, (76, 162), "Practise the right component, when you have time.", F["h2"], C["cyan"], 430)
    features = [
        ("1", "1,554-item drill pool*"),
        ("2", "971-item custom-test bank**"),
        ("3", "Revision modules + tracking"),
    ]
    for i, (num, title) in enumerate(features):
        y = 292 + i * 82
        rounded(d, (86, y, 126, y + 40), C["lime"], radius=10)
        text(d, (106, y + 20), num, F["small_b"], C["bg"], anchor="mm")
        text(d, (148, y + 6), title, F["body_b"], C["white"])
    browser(img, (560, 88, 1210, 540), "01-home.png", scale=0.94, glow=False)
    metric_card(d, (646, 574, 814, 650), "1,554*", "drill / daily pool")
    metric_card(d, (838, 574, 1006, 650), "971**", "custom-test bank")
    metric_card(d, (1030, 574, 1198, 650), "40++", "learners")
    text(d, (76, 630), "* 583 vocab + 666 imbuhan + 305 persamaan.", F["tiny"], C["muted"])
    text(d, (76, 652), "** Custom tests use imbuhan + persamaan question items.", F["tiny"], C["muted"])
    return img


SCENES = [
    (0.0, 1.3, scene_open),
    (1.3, 3.35, scene_modules),
    (3.35, 5.65, scene_drills),
    (5.65, 7.9, scene_habit),
    (7.9, 10.0, scene_close),
]


def render_at(t):
    for i, (start, end, painter) in enumerate(SCENES):
        if start <= t <= end or i == len(SCENES) - 1:
            p = clamp((t - start) / (end - start))
            frame = painter(p)
            transition = 0.14
            if i < len(SCENES) - 1 and end - t < transition:
                nxt = SCENES[i + 1][2](0)
                alpha = ease_in_out((transition - (end - t)) / transition)
                frame = Image.blend(frame, nxt, alpha)
            return frame.convert("RGB")
    return background().convert("RGB")


def save_outputs():
    if FRAME_DIR.exists():
        shutil.rmtree(FRAME_DIR)
    FRAME_DIR.mkdir(parents=True, exist_ok=True)
    PACKAGE.mkdir(parents=True, exist_ok=True)

    try:
        import imageio.v2 as imageio
        writer = imageio.get_writer(MP4_PATH, fps=FPS_MP4, codec="libx264", quality=8, macro_block_size=16)
    except Exception:
        writer = None

    total_frames = int(DURATION * FPS_MP4)
    gif_frames = []
    for i in range(total_frames):
        frame = render_at(i / FPS_MP4)
        if writer:
            writer.append_data(np.asarray(frame))
        if i % (FPS_MP4 // FPS_GIF) == 0:
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
        duration=int(1000 / FPS_GIF),
        loop=0,
        optimize=True,
        disposal=2,
    )
    return GIF_PATH, MP4_PATH if MP4_PATH.exists() else None, FRAME_DIR, len(gif_frames)


if __name__ == "__main__":
    gif, mp4, frames, count = save_outputs()
    print(gif)
    print(mp4)
    print(frames)
    print(f"gif_frames={count}")
    print(f"duration_s={DURATION}")
