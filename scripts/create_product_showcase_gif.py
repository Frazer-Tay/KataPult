from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import shutil

ROOT = Path(__file__).resolve().parents[1]
PACKAGE = ROOT / "product-showcase-package"
SLIDES = PACKAGE / "gif_frames"
GIF = PACKAGE / "KataPult_Product_Showcase_Detailed.gif"

W, H = 1280, 720
C = {
    "navy": "#0B1026",
    "off": "#F8FAFC",
    "ink": "#121826",
    "muted": "#667085",
    "lime": "#C9F23A",
    "teal": "#22D3EE",
    "white": "#FFFFFF",
    "line": "#D7DCE5",
    "card_dark": "#172033",
}


def font(size, bold=False):
    for p in [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]:
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


F = {
    "hero": font(48, True),
    "h1": font(36, True),
    "h2": font(25, True),
    "body": font(18),
    "body_b": font(18, True),
    "small": font(14),
    "small_b": font(14, True),
}


def wrap(draw, text, fnt, max_w):
    words, lines, cur = text.split(), [], ""
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


def text(draw, xy, body, fnt, fill, max_w=None, spacing=1.2):
    x, y = xy
    lines = []
    for para in str(body).split("\n"):
        lines.extend(wrap(draw, para, fnt, max_w) if max_w else [para])
    for line in lines:
        draw.text((x, y), line, font=fnt, fill=fill)
        y += int(fnt.size * spacing)
    return y


def pill(draw, box, label, fill, fg=C["white"], fnt=None):
    fnt = fnt or F["small_b"]
    draw.rounded_rectangle(box, radius=18, fill=fill)
    b = draw.textbbox((0, 0), label, font=fnt)
    draw.text((box[0] + (box[2] - box[0] - (b[2] - b[0])) / 2, box[1] + (box[3] - box[1] - (b[3] - b[1])) / 2 - 1), label, font=fnt, fill=fg)


def card(draw, box, fill=C["white"], outline=C["line"]):
    draw.rounded_rectangle(box, radius=22, fill=fill, outline=outline, width=2)


def base(dark=False, label=None):
    img = Image.new("RGB", (W, H), C["navy"] if dark else C["off"])
    draw = ImageDraw.Draw(img)
    if dark:
        draw.rectangle((0, 0, W, 14), fill=C["lime"])
    if label:
        pill(draw, (54, 38, 218, 74), label.upper(), C["lime"] if dark else C["navy"], C["navy"] if dark else C["white"], F["small_b"])
    return img, draw


def screenshot(path, size):
    img = Image.open(ROOT / "award-demo-assets" / path).convert("RGB")
    img.thumbnail(size)
    canvas = Image.new("RGB", size, C["white"])
    canvas.paste(img, ((size[0] - img.width) // 2, (size[1] - img.height) // 2))
    return canvas


def browser(draw, slide, shot_name, box):
    x1, y1, x2, y2 = box
    card(draw, box, fill=C["white"], outline="#293449")
    draw.rounded_rectangle((x1, y1, x2, y1 + 34), radius=20, fill="#EEF2F7")
    for i, col in enumerate(["#EF4444", "#FACC15", "#22C55E"]):
        draw.ellipse((x1 + 20 + i * 23, y1 + 12, x1 + 31 + i * 23, y1 + 23), fill=col)
    slide.paste(screenshot(shot_name, (x2 - x1 - 28, y2 - y1 - 48)), (x1 + 14, y1 + 42))


def save_frame(img, name):
    p = SLIDES / f"{name}.png"
    img.save(p)
    return p


def metric(draw, box, value, label, dark=False):
    card(draw, box, fill=C["card_dark"] if dark else C["white"], outline="#2B3650" if dark else C["line"])
    text(draw, (box[0] + 22, box[1] + 16), value, F["h2"], C["lime"] if dark else C["ink"])
    text(draw, (box[0] + 22, box[1] + 55), label, F["small"], "#CBD5E1" if dark else C["muted"])


def make_frames():
    if SLIDES.exists():
        shutil.rmtree(SLIDES)
    SLIDES.mkdir(parents=True)
    frames = []

    img, d = base(True, "KataPult")
    title_bottom = text(d, (70, 115), "Bahasa I2 prep,\nrebuilt as daily practice.", F["hero"], C["white"], 530)
    text(d, (72, title_bottom + 18), "Structured drills. Fast feedback. Measurable usage.", F["body"], C["teal"], 520)
    for i, label in enumerate(["40++ users", "4+ entities", "5-10 min drills"]):
        pill(d, (72 + i * 142, title_bottom + 86, 198 + i * 142, title_bottom + 126), label, "#1E293B", C["white"])
    browser(d, img, "01-home.png", (610, 92, 1210, 560))
    text(d, (74, 630), "From scattered materials to a single practice companion.", F["body_b"], C["white"])
    frames.append((save_frame(img, "01_title"), 2300))

    img, d = base(False, "Problem")
    text(d, (58, 102), "The issue was not content.\nIt was practice quality.", F["h1"], C["ink"], 680)
    text(d, (60, 210), "Prep was becoming a folder of screenshots instead of a routine.", F["body"], C["muted"], 700)
    for i, (h, b) in enumerate([
        ("Scattered", "Notes, PDFs, links, Quizlet, internet and LLM outputs."),
        ("Passive", "Reading lists did not drill weak areas."),
        ("Unmeasured", "No shared view of usage or readiness."),
    ]):
        x = 70 + i * 395
        card(d, (x, 325, x + 340, 565))
        text(d, (x + 28, 360), h, F["h2"], C["ink"])
        text(d, (x + 28, 430), b, F["body"], C["muted"], 270)
    frames.append((save_frame(img, "02_problem"), 2800))

    img, d = base(True, "Solution")
    text(d, (62, 105), "One platform for short,\nexam-specific practice.", F["h1"], C["white"], 640)
    for i, label in enumerate(["Choose skill", "Drill actively", "Get feedback", "Track usage"]):
        y = 270 + i * 74
        d.ellipse((80, y, 120, y + 40), fill=C["lime"])
        text(d, (94, y + 6), str(i + 1), F["small_b"], C["navy"])
        text(d, (145, y + 8), label, F["body_b"], C["white"])
    browser(d, img, "03-imbuhan.png", (620, 122, 1210, 565))
    frames.append((save_frame(img, "03_solution"), 2800))

    img, d = base(False, "Coverage")
    text(d, (58, 98), "Built around actual exam components.", F["h1"], C["ink"], 800)
    metrics = [("583", "Vocabulary"), ("666", "Imbuhan"), ("305", "Persamaan"), ("297", "Karangan"), ("23", "Flashcard sets"), ("8", "Surat rasmi sections"), ("971", "Custom test bank"), ("10/day", "Daily challenge")]
    for i, (v, lab) in enumerate(metrics):
        x = 72 + (i % 4) * 295
        y = 220 + (i // 4) * 130
        metric(d, (x, y, x + 250, y + 88), v, lab)
    text(d, (74, 548), "Daily challenge draws from a 1,554-item pool across vocabulary, imbuhan and persamaan.", F["body_b"], C["ink"], 1040)
    frames.append((save_frame(img, "04_coverage"), 3300))

    img, d = base(True, "Key features")
    text(d, (62, 98), "Practice that fits around work.", F["h1"], C["white"], 620)
    for i, (h, b) in enumerate([
        ("Modular drills", "Practise the exact component you need."),
        ("Instant feedback", "Retrieve, check, repeat."),
        ("Gamified routine", "XP, streaks, levels and lives."),
        ("Custom tests", "Turn weak areas into pressure practice."),
    ]):
        x = 80 + (i % 2) * 470
        y = 225 + (i // 2) * 140
        card(d, (x, y, x + 405, y + 100), fill=C["card_dark"], outline="#2B3650")
        text(d, (x + 28, y + 20), h, F["body_b"], C["white"])
        text(d, (x + 28, y + 55), b, F["small"], "#CBD5E1", 330)
    browser(d, img, "07-daily-challenge.png", (970, 205, 1220, 535))
    frames.append((save_frame(img, "05_features"), 3000))

    img, d = base(False, "Demo")
    text(d, (58, 96), "A 10-minute learner journey.", F["h1"], C["ink"])
    steps = ["Open dashboard", "Practise vocabulary", "Drill imbuhan / persamaan", "Review flashcards", "Run custom test"]
    for i, step in enumerate(steps):
        y = 210 + i * 65
        d.ellipse((78, y, 116, y + 38), fill=C["lime"])
        text(d, (91, y + 5), str(i + 1), F["small_b"], C["navy"])
        text(d, (145, y + 6), step, F["body_b"], C["ink"])
    browser(d, img, "06-test-setup.png", (650, 135, 1220, 555))
    frames.append((save_frame(img, "06_demo"), 3000))

    img, d = base(True, "Impact")
    text(d, (62, 96), "From personal prep tool\nto shared learning asset.", F["h1"], C["white"], 620)
    impact = [("40++", "users reached"), ("4+", "entities represented"), ("971", "custom test items"), ("1,554", "daily challenge pool"), ("[insert]", "sessions"), ("[insert]", "practice minutes")]
    for i, (v, lab) in enumerate(impact):
        x = 80 + (i % 3) * 365
        y = 300 + (i // 3) * 115
        metric(d, (x, y, x + 305, y + 84), v, lab, dark=True)
    pill(d, (92, 590, 520, 634), "Before: scattered, solo, unmeasured", "#1E293B", C["white"])
    pill(d, (610, 590, 1055, 634), "After: shared, structured, measurable", C["lime"], C["navy"])
    frames.append((save_frame(img, "07_impact"), 3400))
    return frames


if __name__ == "__main__":
    frames = make_frames()
    images = [Image.open(p).convert("P", palette=Image.ADAPTIVE) for p, _ in frames]
    durations = [dur for _, dur in frames]
    images[0].save(GIF, save_all=True, append_images=images[1:], duration=durations, loop=0, optimize=True)
    print(GIF)
    print(SLIDES)
