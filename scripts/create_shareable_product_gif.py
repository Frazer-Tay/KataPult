from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import shutil

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "award-demo-assets"
PACKAGE = ROOT / "product-showcase-package"
OUT_DIR = PACKAGE / "shareable_gif_frames"
GIF = PACKAGE / "KataPult_Shareable_Product_Teaser.gif"

W, H = 1280, 720

C = {
    "navy": "#080D22",
    "navy2": "#0D1733",
    "slate": "#162033",
    "slate2": "#1E293B",
    "lime": "#BFEA35",
    "lime_soft": "#ECFF99",
    "cyan": "#38D4E8",
    "white": "#FFFFFF",
    "off": "#F8FAFC",
    "muted": "#9AA7B8",
    "ink": "#111827",
    "line": "#D8DEE9",
    "soft": "#EEF2F7",
}


def font(size, bold=False):
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


F = {
    "hero": font(54, True),
    "h1": font(40, True),
    "h2": font(26, True),
    "body": font(20),
    "body_b": font(20, True),
    "small": font(15),
    "small_b": font(15, True),
    "tiny": font(12),
    "metric": font(34, True),
}


def ease(t):
    t = max(0, min(1, t))
    return 1 - (1 - t) ** 3


def rgba(hex_color, alpha=255):
    hex_color = hex_color.lstrip("#")
    return tuple(int(hex_color[i:i + 2], 16) for i in (0, 2, 4)) + (alpha,)


def base():
    img = Image.new("RGBA", (W, H), rgba(C["navy"]))
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, W, 10), fill=C["lime"])
    d.rectangle((0, H - 8, W, H), fill="#070B1D")
    return img


def add_shadow(layer, box, radius=26, blur=18, alpha=95):
    shadow = Image.new("RGBA", layer.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle(box, radius=radius, fill=(0, 0, 0, alpha))
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    layer.alpha_composite(shadow)


def rounded(draw, box, fill, outline=None, radius=24, width=2):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def wrap(draw, body, fnt, max_w):
    words = body.split()
    lines, cur = [], ""
    for word in words:
        test = (cur + " " + word).strip()
        if draw.textbbox((0, 0), test, font=fnt)[2] <= max_w:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def text(draw, xy, body, fnt, fill, max_w=None, spacing=1.18, alpha=255):
    x, y = xy
    fill_rgba = rgba(fill, alpha) if isinstance(fill, str) and fill.startswith("#") else fill
    lines = []
    for para in str(body).split("\n"):
        lines.extend(wrap(draw, para, fnt, max_w) if max_w else [para])
    for line in lines:
        draw.text((x, y), line, font=fnt, fill=fill_rgba)
        y += int(fnt.size * spacing)
    return y


def pill(draw, box, label, fill, fg=C["navy"], fnt=None):
    fnt = fnt or F["small_b"]
    rounded(draw, box, fill, radius=999)
    b = draw.textbbox((0, 0), label, font=fnt)
    draw.text(
        (box[0] + (box[2] - box[0] - (b[2] - b[0])) / 2, box[1] + (box[3] - box[1] - (b[3] - b[1])) / 2 - 1),
        label,
        font=fnt,
        fill=fg,
    )


def load_shot(name, size):
    shot = Image.open(ASSETS / name).convert("RGBA")
    shot.thumbnail(size)
    canvas = Image.new("RGBA", size, rgba(C["white"]))
    canvas.alpha_composite(shot, ((size[0] - shot.width) // 2, (size[1] - shot.height) // 2))
    return canvas


def browser(layer, shot, box, scale=1.0):
    x1, y1, x2, y2 = box
    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2
    w, h = (x2 - x1) * scale, (y2 - y1) * scale
    x1, y1, x2, y2 = int(cx - w / 2), int(cy - h / 2), int(cx + w / 2), int(cy + h / 2)
    add_shadow(layer, (x1, y1, x2, y2), radius=28, blur=22, alpha=120)
    d = ImageDraw.Draw(layer)
    rounded(d, (x1, y1, x2, y2), C["white"], outline="#2A3551", radius=28, width=2)
    rounded(d, (x1, y1, x2, y1 + 38), C["soft"], radius=28)
    for i, col in enumerate(["#F87171", "#FACC15", "#34D399"]):
        d.ellipse((x1 + 24 + i * 24, y1 + 14, x1 + 36 + i * 24, y1 + 26), fill=col)
    d.rounded_rectangle((x1 + 130, y1 + 12, x2 - 30, y1 + 28), radius=8, fill="#E2E8F0")
    shot_img = load_shot(shot, (x2 - x1 - 30, y2 - y1 - 54))
    layer.alpha_composite(shot_img, (x1 + 15, y1 + 46))


def mini_card(layer, box, title, body=None, accent=C["lime"], active=True):
    d = ImageDraw.Draw(layer)
    fill = C["slate"] if active else "#10182D"
    outline = "#33415F" if active else "#202B45"
    rounded(d, box, fill, outline=outline, radius=22, width=2)
    d.rounded_rectangle((box[0] + 18, box[1] + 18, box[0] + 48, box[1] + 48), radius=10, fill=accent)
    text(d, (box[0] + 64, box[1] + 16), title, F["body_b"], C["white"], box[2] - box[0] - 86)
    if body:
        text(d, (box[0] + 64, box[1] + 48), body, F["small"], C["muted"], box[2] - box[0] - 86)


def metric_card(layer, box, value, label, accent=C["lime"]):
    d = ImageDraw.Draw(layer)
    rounded(d, box, C["slate"], outline="#33415F", radius=20, width=2)
    text(d, (box[0] + 22, box[1] + 14), value, F["metric"], accent)
    text(d, (box[0] + 22, box[1] + 56), label, F["small"], "#CAD5E4", box[2] - box[0] - 44)


def material_card(layer, box, label, detail=None, progress=1.0):
    d = ImageDraw.Draw(layer)
    dy = int((1 - ease(progress)) * 18)
    box = (box[0], box[1] + dy, box[2], box[3] + dy)
    rounded(d, box, "#172033", outline="#354665", radius=18, width=2)
    text(d, (box[0] + 18, box[1] + 14), label, F["body_b"], C["white"], box[2] - box[0] - 36)
    if detail:
        text(d, (box[0] + 18, box[1] + 44), detail, F["small"], C["muted"], box[2] - box[0] - 36)


def module_card(layer, box, title, detail, active=False):
    d = ImageDraw.Draw(layer)
    fill = "#1B2740" if active else "#121B31"
    outline = C["lime"] if active else "#33415F"
    rounded(d, box, fill, outline=outline, radius=22, width=2)
    dot = C["lime"] if active else "#4C5B78"
    d.rounded_rectangle((box[0] + 20, box[1] + 22, box[0] + 48, box[1] + 50), radius=10, fill=dot)
    text(d, (box[0] + 66, box[1] + 16), title, F["body_b"], C["white"], box[2] - box[0] - 88)
    text(d, (box[0] + 66, box[1] + 48), detail, F["small"], C["muted"], box[2] - box[0] - 88)


def feedback_card(layer, box, title, detail, accent=C["lime"]):
    d = ImageDraw.Draw(layer)
    rounded(d, box, "#172033", outline="#34445F", radius=22, width=2)
    d.ellipse((box[0] + 20, box[1] + 22, box[0] + 50, box[1] + 52), fill=accent)
    text(d, (box[0] + 68, box[1] + 18), title, F["body_b"], C["white"], box[2] - box[0] - 88)
    text(d, (box[0] + 68, box[1] + 50), detail, F["small"], C["muted"], box[2] - box[0] - 88)


def floating_tag(layer, box, label, detail=None, accent=C["lime"]):
    d = ImageDraw.Draw(layer)
    add_shadow(layer, box, radius=18, blur=12, alpha=70)
    rounded(d, box, "#10182D", outline="#34445F", radius=18, width=2)
    d.rounded_rectangle((box[0] + 18, box[1] + 18, box[0] + 42, box[1] + 42), radius=8, fill=accent)
    text(d, (box[0] + 58, box[1] + 13), label, F["body_b"], C["white"], box[2] - box[0] - 76)
    if detail:
        text(d, (box[0] + 58, box[1] + 44), detail, F["small"], C["muted"], box[2] - box[0] - 76)


def save_frame(img, name):
    p = OUT_DIR / f"{name}.png"
    img.convert("RGB").save(p, quality=95)
    return p


def scene_problem(t):
    img = base()
    d = ImageDraw.Draw(img)
    pill(d, (64, 44, 198, 82), "PROBLEM", C["lime"], C["navy"])
    title_bottom = text(d, (72, 124), "Bahasa I2 prep\nwas scattered.", F["hero"], C["white"], 560)
    text(d, (76, title_bottom + 22), "Useful materials existed, but practice was fragmented.", F["body"], C["cyan"], 650)

    cards = [
        ((86, 360, 300, 438), "Notes", "Personal summaries"),
        ((330, 420, 544, 498), "PDFs", "Reference files"),
        ((574, 350, 788, 428), "Screenshots", "Saved examples"),
        ((816, 426, 1030, 504), "Links", "Useful pages"),
        ((206, 520, 420, 598), "Quizlet", "Existing sets"),
        ((646, 535, 860, 613), "LLM prompts", "Extra practice"),
    ]
    for i, (box, label, detail) in enumerate(cards):
        progress = min(1, max(0, t * 5 - i * 0.36))
        material_card(img, box, label, detail, progress)

    rounded(d, (930, 170, 1195, 260), "#10182D", outline="#2A3653", radius=24)
    text(d, (958, 195), "The gap was practice", F["body_b"], C["white"], 210)
    text(d, (958, 226), "not content", F["body_b"], C["lime"], 210)
    text(d, (76, 646), "Reading across resources was not the same as repeatable practice.", F["body_b"], C["white"], 900)
    return img


def scene_solution(t):
    img = base()
    d = ImageDraw.Draw(img)
    pill(d, (64, 44, 198, 82), "SOLUTION", C["lime"], C["navy"])
    title_bottom = text(d, (70, 120), "One place for\nfocused practice.", F["hero"], C["white"], 600)
    text(d, (74, title_bottom + 24), "Short drills for vocabulary, imbuhan, persamaan and writing.", F["body"], C["cyan"], 420)

    start = [(78, 390), (236, 456), (104, 530), (306, 360)]
    labels = ["Notes", "PDFs", "Links", "Prompts"]
    target = (568, 410)
    for i, (sx, sy) in enumerate(start):
        reveal = ease(t)
        x = int(sx + (target[0] - sx) * reveal)
        y = int(sy + (target[1] - sy) * reveal)
        w = int(130 - 46 * reveal)
        h = int(42 - 14 * reveal)
        if reveal < 0.94:
            rounded(d, (x, y, x + w, y + h), "#172033", outline="#354665", radius=14)
            text(d, (x + 14, y + 9), labels[i], F["small_b"], C["white"])

    browser(img, "01-home.png", (540, 100, 1215, 600), scale=0.94 + 0.06 * ease(t))
    for i, label in enumerate(["Vocabulary", "Imbuhan", "Persamaan", "Tests"]):
        x = 620 + i * 134
        y = 616
        pill(d, (x, y, x + 118, y + 36), label, "#172033", C["white"], F["tiny"])

    loop = [("Choose", 78), ("Drill", 190), ("Review", 302), ("Track", 414)]
    for i, (label, x) in enumerate(loop):
        active = ease(min(1, max(0, t * 4 - i * 0.45)))
        fill = C["lime"] if active > 0.7 else "#172033"
        fg = C["navy"] if active > 0.7 else C["white"]
        pill(d, (x, 464, x + 86, 500), label, fill, fg, F["tiny"])
    return img


def scene_practice(t):
    img = base()
    d = ImageDraw.Draw(img)
    pill(d, (64, 44, 188, 82), "PRACTICE", C["lime"], C["navy"])
    title_bottom = text(d, (70, 120), "Pick a weak area.", F["hero"], C["white"], 620)
    text(d, (74, title_bottom + 22), "Practise in 5 to 10 minute pockets.", F["body"], C["cyan"], 560)

    shots = ["03-imbuhan.png", "04-persamaan.png", "05-flashcards.png", "06-test-setup.png"]
    idx = min(len(shots) - 1, int(t * len(shots)))
    browser(img, shots[idx], (555, 95, 1215, 608))

    modules = [
        ("Imbuhan", "Word formation drills"),
        ("Persamaan", "Synonym precision"),
        ("Flashcards", "Recall and review"),
        ("Custom test", "Mixed pressure practice"),
    ]
    for i, (title, detail) in enumerate(modules):
        y = 306 + i * 84
        module_card(img, (78, y, 442, y + 76), title, detail, active=i == idx)

    text(d, (82, 646), "Pick a module, practise, continue later.", F["body_b"], C["white"], 650)
    return img


def scene_feedback(t):
    img = base()
    d = ImageDraw.Draw(img)
    pill(d, (64, 44, 208, 82), "FEEDBACK", C["lime"], C["navy"])
    title_bottom = text(d, (70, 120), "Get feedback.\nBuild the habit.", F["hero"], C["white"], 610)
    text(d, (74, title_bottom + 22), "Active recall beats rereading notes.", F["body"], C["cyan"], 560)

    browser(img, "07-daily-challenge.png", (560, 92, 1215, 590), scale=0.98)

    reveal = ease(t)
    cards = [
        ((78, 330, 442, 408), "Check answers", "Know what to repeat", C["lime"]),
        ((78, 430, 442, 508), "Daily challenge", "A small routine to return to", C["cyan"]),
        ((78, 530, 442, 608), "Track practice", "See what you covered", C["lime"]),
    ]
    for i, (box, title, detail, accent) in enumerate(cards):
        p = min(1, max(0, reveal * 3 - i * 0.5))
        shifted = (box[0], box[1] + int((1 - p) * 24), box[2], box[3] + int((1 - p) * 24))
        feedback_card(img, shifted, title, detail, accent)

    if reveal > 0.25:
        floating_tag(img, (805, 470, 1040, 532), "Instant check", "Repeat the weak item", C["lime"])
    if reveal > 0.55:
        floating_tag(img, (890, 378, 1115, 440), "Progress cue", "Streak, XP, level", C["cyan"])
    return img


def scene_end(t):
    img = base()
    d = ImageDraw.Draw(img)
    pill(d, (64, 44, 216, 82), "KATAPULT", C["lime"], C["navy"])
    title_bottom = text(d, (72, 118), "KataPult", F["hero"], C["white"], 520)
    sub_bottom = text(d, (76, title_bottom + 20), "Bahasa I2 prep, made structured and repeatable.", F["body"], C["cyan"], 620)
    text(d, (76, sub_bottom + 32), "Practise the component you need, when you have time.", F["body_b"], C["white"], 640)

    browser(img, "01-home.png", (640, 90, 1215, 485), scale=0.98)

    metrics = [
        ("40++", "learners"),
        ("4+", "entities"),
        ("Reusable", "module bank"),
        ("Usage", "tracking ready"),
    ]
    for i, (value, label) in enumerate(metrics):
        p = ease(min(1, max(0, t * 4 - i * 0.35)))
        x = 76 + i * 292
        y = 548 + int((1 - p) * 22)
        metric_card(img, (x, y, x + 242, y + 90), value, label, C["lime"] if i < 2 else C["cyan"])

    text(d, (434, 662), "frazer-tay.github.io/KataPult", F["body_b"], C["white"])
    return img


def add_scene(raw_frames, prefix, painter, steps=5, hold=1200):
    for i in range(steps):
        t = i / max(1, steps - 1)
        duration = 110 if i < steps - 1 else hold
        raw_frames.append((prefix, painter(t), duration))


def add_transition(raw_frames, prev_img, next_img, prefix):
    for i, alpha in enumerate([0.33, 0.66], start=1):
        blended = Image.blend(prev_img.convert("RGBA"), next_img.convert("RGBA"), alpha)
        raw_frames.append((f"{prefix}_transition_{i:02d}", blended, 120))


def make_gif():
    if OUT_DIR.exists():
        shutil.rmtree(OUT_DIR)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    scenes = [
        ("01_problem", scene_problem, 6, 1900),
        ("02_solution", scene_solution, 6, 2100),
        ("03_practice", scene_practice, 8, 2100),
        ("04_feedback", scene_feedback, 6, 2100),
        ("05_end", scene_end, 6, 2600),
    ]
    raw = []
    previous_last = None
    for prefix, painter, steps, hold in scenes:
        scene_raw = []
        add_scene(scene_raw, prefix, painter, steps=steps, hold=hold)
        if previous_last is not None:
            add_transition(raw, previous_last, scene_raw[0][1], prefix)
        raw.extend(scene_raw)
        previous_last = scene_raw[-1][1]

    frames = []
    for idx, (prefix, image, duration) in enumerate(raw, start=1):
        frames.append((save_frame(image, f"{idx:02d}_{prefix}"), duration))

    images = [Image.open(path).convert("P", palette=Image.ADAPTIVE, colors=128) for path, _ in frames]
    durations = [duration for _, duration in frames]
    images[0].save(GIF, save_all=True, append_images=images[1:], duration=durations, loop=0, optimize=True)
    return GIF, OUT_DIR, len(frames), sum(durations)


if __name__ == "__main__":
    gif, frame_dir, frame_count, total_ms = make_gif()
    print(gif)
    print(frame_dir)
    print(f"frames={frame_count}")
    print(f"duration_ms={total_ms}")
