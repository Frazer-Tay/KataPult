from pathlib import Path

from PIL import Image
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_CONNECTOR, MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_AUTO_SIZE
from pptx.util import Inches, Pt

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "award-demo-assets"
PACKAGE = ROOT / "product-showcase-package"
DEMO_ASSETS = PACKAGE / "demo_state_assets"
OUT = PACKAGE / "KataPult_Improved_Editable_Product_Walkthrough_6slides.pptx"

SW, SH = 13.333333, 7.5

COL = {
    "paper": "F5F3EE",
    "white": "FFFFFF",
    "ink": "18202B",
    "muted": "667085",
    "subtle": "8A927D",
    "line": "D8D3C8",
    "soft": "ECE8DF",
    "soft2": "F9F8F4",
    "green": "7FAE2D",
    "teal": "1F6D78",
    "amber": "C88A2C",
    "chrome": "E8ECEF",
}


def rgb(key):
    h = COL[key] if key in COL else key
    return RGBColor(int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))


def crop_screenshot(name):
    src = DEMO_ASSETS / name if (DEMO_ASSETS / name).exists() else ASSETS / name
    im = Image.open(src)
    if im.height <= 780:
        return src
    out_dir = PACKAGE / "editable_screenshot_crops"
    out_dir.mkdir(parents=True, exist_ok=True)
    out = out_dir / name
    im.crop((0, 0, im.width, 780)).save(out)
    return out


def make_imbuhan_explanation_demo():
    DEMO_ASSETS.mkdir(parents=True, exist_ok=True)
    out = DEMO_ASSETS / "09-imbuhan-explanation-demo.png"
    W, H = 1440, 780
    im = Image.new("RGB", (W, H), "#F8F7F4")
    from PIL import ImageDraw, ImageFont

    draw = ImageDraw.Draw(im)

    def font(size, bold=False):
        candidates = ["C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf", "C:/Windows/Fonts/calibri.ttf"]
        for p in candidates:
            if Path(p).exists():
                return ImageFont.truetype(p, size)
        return ImageFont.load_default()

    f10, f12, f14, f16, f18, f22, f28 = font(10), font(12), font(14), font(16), font(18), font(22, True), font(28, True)
    fb14, fb16, fb18 = font(14, True), font(16, True), font(18, True)

    def round_rect(box, fill, outline="#E2DED5", r=18, width=1):
        draw.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)

    # Header
    draw.rectangle((0, 0, W, 92), fill="#FFFFFF")
    draw.text((74, 28), "KataPult", font=fb16, fill="#4B2BBF")
    draw.text((74, 52), "Bahasa Prep Companion", font=f10, fill="#667085")
    nav = ["Beranda", "Vocabulary", "Imbuhan", "Persamaan MCQ", "Persamaan Latihan", "Karangan", "Flashcards", "Surat Resmi", "Tes"]
    x = 484
    for item in nav:
        w = draw.textbbox((0, 0), item, font=f12)[2]
        if item == "Imbuhan":
            round_rect((x - 12, 31, x + w + 12, 61), "#EEE8FF", "#EEE8FF", 14)
            draw.text((x, 38), item, font=fb14, fill="#4B2BBF")
        else:
            draw.text((x, 38), item, font=f12, fill="#475467")
        x += w + 34

    # Soft app background
    draw.rectangle((0, 92, W, H), fill="#FBFAF7")
    draw.rectangle((0, 92, 252, H), fill="#EFF6F4")

    # Main card
    round_rect((420, 125, 1020, 728), "#FFFFFF", "#E2DED5", 24)
    draw.text((470, 158), "Imbuhan", font=f28, fill="#18202B")
    draw.text((922, 164), "1 / 666", font=fb14, fill="#667085")
    round_rect((470, 207, 970, 219), "#E9E7E2", "#E9E7E2", 6)
    round_rect((470, 207, 548, 219), "#7FAE2D", "#7FAE2D", 6)

    draw.text((470, 252), "Lengkapi kalimat berikut:", font=f14, fill="#98A2B3")
    round_rect((470, 282, 970, 356), "#F5F3EE", "#E2DED5", 14)
    draw.text((520, 309), "Produk ini menggunakan pewarna ___ dari tumbuh-tumbuhan.", font=fb16, fill="#18202B")

    draw.text((470, 380), "Kata dasar:", font=f12, fill="#98A2B3")
    round_rect((470, 404, 632, 455), "#F9F8F4", "#E2DED5", 12)
    draw.text((526, 420), "alam", font=fb16, fill="#18202B")
    round_rect((688, 404, 970, 455), "#ECF8EA", "#A7C957", 12)
    draw.text((718, 420), "Hint: natural", font=fb14, fill="#3F6212")

    draw.text((470, 492), "Ketik bentuk kata yang tepat:", font=fb14, fill="#18202B")
    round_rect((470, 526, 760, 580), "#FFFFFF", "#7FAE2D", 12, 2)
    draw.text((500, 542), "alami", font=fb16, fill="#18202B")
    round_rect((786, 526, 970, 580), "#7FAE2D", "#7FAE2D", 12)
    draw.text((842, 542), "Periksa", font=fb16, fill="#FFFFFF")

    round_rect((470, 610, 970, 658), "#EEF8EA", "#7FAE2D", 14, 2)
    draw.text((500, 623), "Tepat! Jawaban benar.", font=fb16, fill="#18202B")

    round_rect((470, 674, 970, 714), "#F9F8F4", "#D8D3C8", 14)
    draw.text((500, 685), "Penjelasan", font=fb16, fill="#18202B")
    explanation = "Root 'alam' takes the suffix '-i' to form 'alami' (natural), which describes the colouring in the sentence."
    words, line, lines = explanation.split(), "", []
    for word in words:
        cand = (line + " " + word).strip()
        if draw.textbbox((0, 0), cand, font=f14)[2] < 420:
            line = cand
        else:
            lines.append(line)
            line = word
    lines.append(line)
    draw.text((640, 688), "Root 'alam' + '-i' forms 'alami'.", font=f14, fill="#667085")

    # Callout label
    round_rect((1038, 528, 1322, 690), "#FFFFFF", "#D8D3C8", 18)
    draw.rectangle((1062, 558, 1068, 660), fill="#7FAE2D")
    draw.text((1090, 552), "Answer feedback", font=f22, fill="#18202B")
    draw.text((1090, 594), "Shows whether the", font=f14, fill="#667085")
    draw.text((1090, 614), "answer is right or wrong,", font=f14, fill="#667085")
    draw.text((1090, 634), "then explains why.", font=f14, fill="#667085")

    im.save(out, quality=95)
    return out


class Deck:
    def __init__(self):
        self.prs = Presentation()
        self.prs.slide_width = Inches(SW)
        self.prs.slide_height = Inches(SH)
        self.blank = self.prs.slide_layouts[6]

    def slide(self, n, section):
        s = self.prs.slides.add_slide(self.blank)
        s.background.fill.solid()
        s.background.fill.fore_color.rgb = rgb("paper")
        self.line(s, 0.6, 0.62, 12.73, 0.62, "line", 0.75)
        self.text(s, 0.6, 0.32, 0.8, 0.2, "KataPult", 8.5, "ink", True)
        self.text(s, 1.43, 0.32, 3.3, 0.2, section, 8.5, "subtle")
        self.text(s, 12.56, 0.32, 0.18, 0.2, f"{n:02d}", 8.5, "subtle", True, align=PP_ALIGN.RIGHT)
        return s

    def text(self, s, x, y, w, h, value, size, color="ink", bold=False, font="Segoe UI", align=None):
        box = s.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
        tf = box.text_frame
        tf.clear()
        tf.word_wrap = True
        tf.auto_size = MSO_AUTO_SIZE.NONE
        for attr in ["margin_left", "margin_right", "margin_top", "margin_bottom"]:
            setattr(tf, attr, 0)
        p = tf.paragraphs[0]
        p.text = str(value)
        p.space_after = Pt(0)
        p.line_spacing = 1.05
        if align:
            p.alignment = align
        for run in p.runs:
            run.font.name = font
            run.font.size = Pt(size)
            run.font.bold = bold
            run.font.color.rgb = rgb(color)
        return box

    def title(self, s, eyebrow, title, subtitle, x=0.6, y=1.08, w=6.4, title_size=34):
        self.text(s, x, y, w, 0.22, eyebrow.upper(), 8.5, "green", True)
        lines = title.count("\n") + 1
        self.text(s, x, y + 0.3, w, 0.56 * lines, title, title_size, "ink", False, "Bahnschrift")
        if subtitle:
            self.text(s, x, y + 0.42 + 0.56 * lines, w, 0.6, subtitle, 13, "muted")

    def shape(self, s, x, y, w, h, fill="white", outline="line", radius=True):
        shp = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
        shp.fill.solid()
        shp.fill.fore_color.rgb = rgb(fill)
        if outline:
            shp.line.color.rgb = rgb(outline)
            shp.line.width = Pt(0.75)
        else:
            shp.line.fill.background()
        return shp

    def line(self, s, x1, y1, x2, y2, color="green", width=2):
        c = s.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, Inches(x1), Inches(y1), Inches(x2), Inches(y2))
        c.line.color.rgb = rgb(color)
        c.line.width = Pt(width)
        return c

    def arrow(self, s, x1, y1, x2, y2, color="green"):
        c = self.line(s, x1, y1, x2, y2, color, 2.5)
        c.line.end_arrowhead = True
        return c

    def card(self, s, x, y, w, h, title, body=None, accent="green", title_size=13, body_size=9.5):
        self.shape(s, x, y, w, h)
        self.shape(s, x + 0.12, y + 0.16, 0.04, h - 0.32, accent, None)
        self.text(s, x + 0.3, y + 0.18, w - 0.45, 0.25, title, title_size, "ink", True)
        if body:
            self.text(s, x + 0.3, y + 0.48, w - 0.45, h - 0.56, body, body_size, "muted")

    def browser(self, s, x, y, w, h, shot):
        self.shape(s, x + 0.06, y + 0.08, w, h, "soft", None)
        self.shape(s, x, y, w, h, "white", "line")
        self.shape(s, x, y, w, 0.34, "chrome", None)
        self.shape(s, x + 0.18, y + 0.12, 0.1, 0.1, "E36F66", None)
        self.shape(s, x + 0.38, y + 0.12, 0.1, 0.1, "E2B646", None)
        self.shape(s, x + 0.58, y + 0.12, 0.1, 0.1, "55B983", None)
        path = crop_screenshot(shot)
        im = Image.open(path)
        max_w, max_h = w - 0.22, h - 0.44
        ratio = min(max_w / im.width, max_h / im.height)
        pw, ph = im.width * ratio, im.height * ratio
        s.shapes.add_picture(str(path), Inches(x + 0.11 + (max_w - pw) / 2), Inches(y + 0.4 + (max_h - ph) / 2), width=Inches(pw), height=Inches(ph))

    def metric(self, s, x, y, w, h, value, label, note, color="green"):
        self.shape(s, x, y, w, h)
        self.text(s, x + 0.18, y + 0.15, w - 0.36, 0.38, value, 22, color, False, "Bahnschrift")
        self.text(s, x + 0.18, y + 0.62, w - 0.36, 0.22, label, 9.2, "ink", True)
        self.text(s, x + 0.18, y + 0.88, w - 0.36, 0.28, note, 7.6, "muted")


def build():
    d = Deck()

    s = d.slide(1, "Practice Companion")
    d.title(s, "Working prototype", "KataPult: Bahasa Indo\nPractice Companion", "A working prototype for short, structured Bahasa Indo revision.", w=6.2)
    d.browser(s, 6.6, 1.1, 6.0, 4.7, "01-home.png")
    d.shape(s, 0.64, 6.18, 11.94, 0.62)
    d.text(s, 0.96, 6.45, 10.8, 0.25, "Relevant Bahasa Indo learning materials centralised into one practice companion.", 13, "ink", True)

    s = d.slide(2, "Problem")
    d.title(s, "Preparation reality", "The hard part was not finding\ncontent. It was restarting\npractice.", "Learners had notes, screenshots, online references, recall packs and generated practice material, but no clear place to continue after a break.", w=7.1)
    for i, (h, b) in enumerate([
        ("No clear next step", "Each session started with deciding what to revise."),
        ("Weak areas were hard to isolate", "Imbuhan, persamaan and formal writing need repeated practice."),
        ("Progress was hard to see", "Attempts, mistakes and return points were not easy to track."),
    ]):
        d.card(s, 0.64, 3.82 + i * 0.86, 5.7, 0.68, h, b)
    d.shape(s, 7.75, 1.46, 4.48, 1.65)
    d.text(s, 7.98, 1.74, 2.0, 0.26, "Scattered inputs", 13, "ink", True)
    for i, item in enumerate(["Notes", "Screenshots", "Online references", "Recall packs", "Generated practice material"]):
        d.text(s, 8.16, 2.08 + i * 0.2, 3.2, 0.16, "• " + item, 9.5, "muted")
    d.arrow(s, 10.0, 3.18, 10.0, 3.72)
    d.shape(s, 7.75, 3.82, 4.48, 0.64, "soft2")
    d.text(s, 8.9, 4.1, 2.2, 0.2, '"Where do I continue?"', 13, "ink", True, align=PP_ALIGN.CENTER)
    d.arrow(s, 10.0, 4.52, 10.0, 5.05)
    d.shape(s, 7.75, 5.15, 4.48, 0.64, "soft")
    d.text(s, 8.65, 5.42, 2.8, 0.2, "Too much setup before practice", 13, "ink", True, align=PP_ALIGN.CENTER)

    s = d.slide(3, "What Changes")
    d.title(s, "What KataPult changes", "Scattered materials become\nshort practice flows.", "KataPult centralises relevant learning materials in one place, then routes them into drills, tests, feedback and writing-support pages.", w=7.2)
    for i, item in enumerate(["Notes", "Online references", "Screenshots", "Recall packs", "Generated practice material"]):
        d.shape(s, 0.65, 3.45 + i * 0.42, 2.85, 0.32)
        d.text(s, 0.82, 3.56 + i * 0.42, 2.4, 0.12, item, 8.5, "ink", True)
    d.arrow(s, 3.65, 4.42, 4.55, 4.42)
    d.shape(s, 4.68, 3.95, 3.35, 1.1)
    d.text(s, 5.9, 4.2, 0.9, 0.24, "KataPult", 17, "green", True, align=PP_ALIGN.CENTER)
    d.text(s, 5.55, 4.54, 1.65, 0.2, "organises content", 12, "ink", True, align=PP_ALIGN.CENTER)
    d.arrow(s, 8.25, 4.42, 9.05, 4.42)
    for i, item in enumerate(["Daily challenge", "Component drills", "Custom tests", "Feedback explanations", "Writing guides and examples"]):
        d.shape(s, 9.26, 3.45 + i * 0.42, 3.15, 0.32, "EEF6E8")
        d.text(s, 9.43, 3.56 + i * 0.42, 2.75, 0.12, item, 8.5, "ink", True)
    d.shape(s, 0.65, 6.27, 11.76, 0.48, "soft2")
    d.text(s, 0.88, 6.49, 10.8, 0.14, "Review note: AI-assisted practice items are flagged for human review before being treated as validated material.", 8.5, "muted", True)

    s = d.slide(4, "Product Loop")
    d.title(s, "Practice loop", "A simple loop keeps\npractice moving.", "Learners can pick a module, practise briefly, understand the answer and return through daily challenge, XP or streaks.", w=5.9)
    d.browser(s, 6.73, 1.16, 5.85, 3.15, "07-daily-challenge.png")
    for i, label in enumerate(["Start a short drill", "Track progress", "Understand answers"]):
        d.card(s, 6.74 + i * 1.9, 4.45, 1.7, 0.42, label, None, ["green", "teal", "green"][i], 9.3)
    for i, (h, b) in enumerate([
        ("Pick a module", "Start with the area that needs work."),
        ("Practise briefly", "Use a daily challenge or focused test."),
        ("Get feedback", "Right/wrong + LLM explanation."),
        ("Review mistakes", "Repeat missed items or continue."),
        ("Return later", "Use daily challenge, XP or streaks."),
    ]):
        x = 0.64 + i * 2.47
        d.card(s, x, 5.05, 2.05, 1.22, h, b, "green", 10, 7.5)
        d.shape(s, x + 0.16, 5.24, 0.3, 0.3, "green", None)
        d.text(s, x + 0.25, 5.34, 0.08, 0.08, str(i + 1), 8, "white", True, align=PP_ALIGN.CENTER)

    s = d.slide(5, "Feature Walkthrough")
    d.title(s, "Feature walkthrough", "Each component has a\nspecific learning job.", "The app separates browsing, typed practice, recall, writing guides and focused tests so learners do not revise from one giant list.", w=7.0)
    rows = [
        ("Vocabulary", "Meanings, examples and translations for core word building."),
        ("Imbuhan", "Affix practice: apply prefixes, suffixes and word-form rules correctly."),
        ("Persamaan MCQ", "Synonym recognition through sentence-context questions."),
        ("Persamaan Latihan", "Typed synonym practice with immediate feedback."),
        ("Karangan", "Essay vocabulary, phrase banks and definitions for composition writing."),
        ("Essay Recall Packs", "Fast recall of openings, conclusions, examples and useful essay phrases."),
        ("Surat Resmi", "Formal letter structure, tone, standard phrases and sample responses."),
        ("Custom Test", "Configurable drills for focused revision on selected components."),
        ("Progress", "Streaks, XP and levels that make return practice visible."),
    ]
    d.shape(s, 0.64, 3.05, 7.08, 3.6)
    for i, (h, b) in enumerate(rows):
        y = 3.22 + i * 0.36
        d.text(s, 0.86, y, 1.85, 0.16, h, 8.6, "ink", True)
        d.text(s, 3.02, y, 4.3, 0.16, b, 8.4, "muted")
        if i:
            d.line(s, 0.83, y - 0.07, 7.5, y - 0.07, "line", 0.4)
    d.browser(s, 8.33, 2.27, 4.25, 3.72, "03-imbuhan.png")
    d.card(s, 8.33, 6.05, 4.25, 0.82, "Shown action", "Learner answers, checks feedback, and can read an LLM-generated explanation.", "green", 10, 9)

    s = d.slide(6, "Current State")
    d.title(s, "Current scale", "Current state: useful enough to trial,\nstill early enough to improve.", "The current numbers show coverage and informal trial use. Stronger learning claims should come after content review and usage analysis.", w=7.5)
    for i, (v, lab, note, c) in enumerate([
        ("1,554", "active drill-ready items", "Vocabulary, imbuhan and persamaan question pool.", "green"),
        ("971", "current custom-test items", "Custom Test currently covers imbuhan + persamaan.", "teal"),
        ("10++", "early informal trial users", "Enough early use to keep improving.", "amber"),
        ("Multiple", "practice modes", "Drills, recall, writing guides and tests.", "green"),
    ]):
        d.metric(s, 0.64 + (i % 2) * 3.68, 3.45 + (i // 2) * 1.36, 3.25, 1.05, v, lab, note, c)
    d.browser(s, 8.33, 1.88, 4.25, 3.28, "06-test-setup.png")
    d.shape(s, 0.64, 6.24, 11.94, 0.52, "soft2")
    d.text(s, 0.88, 6.47, 10.9, 0.14, "Footnote: These numbers describe content coverage and informal trial usage. Learning impact should be validated through future review.", 8.3, "muted", True)

    s = d.slide(7, "Next Steps")
    d.title(s, "Next refinement steps", "The app helps learners restart\npractice more easily.", "It centralises relevant learning materials, gives learners a clear place to continue, and explains answers after practice.", w=8.0)
    for i, (h, b, c) in enumerate([
        ("Content quality", "Review collected items and generated explanations before treating them as validated material.", "green"),
        ("User feedback", "Collect what learners find useful, confusing or missing during real use.", "teal"),
        ("Iterative refinement", "Use feedback and usage patterns to improve the most-used modules first.", "amber"),
    ]):
        d.card(s, 0.64 + i * 4.05, 3.58, 3.54, 1.36, h, b, c, 13, 9.5)
    d.shape(s, 0.64, 5.75, 11.94, 0.88)
    d.text(s, 0.93, 6.05, 11.1, 0.36, "KataPult should keep improving through continuous user feedback, content review and small product refinements based on real practice behaviour.", 17, "ink", True)

    PACKAGE.mkdir(parents=True, exist_ok=True)
    d.prs.save(OUT)
    print(OUT)


if __name__ == "__main__":
    build()
