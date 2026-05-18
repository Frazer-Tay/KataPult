from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import zipfile
import html
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "award-demo-assets"
OUT = ROOT / "award-submission-package"
SLIDES_DIR = OUT / "v2_slide_renders"
PPTX = OUT / "KataPult_Innovation_Award_Showcase_v2.pptx"
BLUEPRINT = OUT / "KataPult_award_pitch_blueprint.md"

W, H = 1600, 900
EMU = 914400
SW, SH = int(13.333333 * EMU), int(7.5 * EMU)

C = {
    "navy": "#0B1026",
    "charcoal": "#111827",
    "ink": "#1F2937",
    "muted": "#667085",
    "off": "#F8FAFC",
    "card": "#FFFFFF",
    "line": "#D7DCE5",
    "lime": "#C9F23A",
    "teal": "#22D3EE",
    "purple": "#7C5CFF",
    "orange": "#FB923C",
    "green": "#22C55E",
    "red": "#EF4444",
    "slate": "#172033",
    "slate2": "#CBD5E1",
}


def font(size, bold=False):
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for p in candidates:
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


F = {
    "h1": font(58, True),
    "h2": font(40, True),
    "h3": font(28, True),
    "body": font(22),
    "body_b": font(22, True),
    "small": font(17),
    "small_b": font(17, True),
    "tiny": font(13, True),
}


def wrap(draw, text, fnt, max_w):
    words, lines, current = text.split(), [], ""
    for word in words:
        test = (current + " " + word).strip()
        if draw.textbbox((0, 0), test, font=fnt)[2] <= max_w:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def text(draw, xy, body, fnt, fill, max_w=None, spacing=1.2):
    x, y = xy
    lines = []
    for para in str(body).split("\n"):
        lines.extend(wrap(draw, para, fnt, max_w) if max_w else [para])
    line_h = int(fnt.size * spacing)
    for line in lines:
        draw.text((x, y), line, font=fnt, fill=fill)
        y += line_h
    return y


def pill(draw, box, label, fill, fg, fnt=None):
    fnt = fnt or F["tiny"]
    draw.rounded_rectangle(box, radius=18, fill=fill)
    tw = draw.textbbox((0, 0), label, font=fnt)
    draw.text((box[0] + (box[2] - box[0] - (tw[2] - tw[0])) / 2, box[1] + (box[3] - box[1] - (tw[3] - tw[1])) / 2 - 1), label, font=fnt, fill=fg)


def card(draw, box, fill=C["card"], outline=C["line"], radius=26):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=2)


def screenshot(path, size):
    img = Image.open(ASSETS / path).convert("RGB")
    img.thumbnail(size)
    canvas = Image.new("RGB", size, "white")
    canvas.paste(img, ((size[0] - img.width) // 2, (size[1] - img.height) // 2))
    return canvas


def browser(draw, slide, path, box):
    x1, y1, x2, y2 = box
    card(draw, (x1, y1, x2, y2), fill="#FFFFFF", outline="#293449", radius=24)
    draw.rounded_rectangle((x1, y1, x2, y1 + 40), radius=24, fill="#EEF2F7")
    for i, col in enumerate([C["red"], "#FACC15", C["green"]]):
        draw.ellipse((x1 + 22 + i * 26, y1 + 15, x1 + 34 + i * 26, y1 + 27), fill=col)
    img = screenshot(path, (x2 - x1 - 34, y2 - y1 - 58))
    slide.paste(img, (x1 + 17, y1 + 48))


def base(dark=False, section=None, num=None):
    slide = Image.new("RGB", (W, H), C["navy"] if dark else C["off"])
    draw = ImageDraw.Draw(slide)
    if dark:
        draw.rectangle((0, 0, W, 18), fill=C["lime"])
    if section:
        pill(draw, (70, 48, 250, 88), section.upper(), C["lime"] if dark else C["navy"], C["navy"] if dark else "white")
    if num:
        draw.text((W - 92, H - 58), f"{num:02d}", font=F["small_b"], fill="white" if dark else C["muted"])
    return slide, draw


def metric(draw, box, value, label):
    card(draw, box)
    text(draw, (box[0] + 28, box[1] + 18), value, F["h3"], C["purple"])
    text(draw, (box[0] + 28, box[1] + 62), label, F["small"], C["muted"])


def save(slide, n):
    p = SLIDES_DIR / f"slide{n:02d}.png"
    slide.save(p)
    return p


def make_slides():
    OUT.mkdir(exist_ok=True)
    SLIDES_DIR.mkdir(exist_ok=True)
    paths = []

    s, d = base(True, "Innovation Award", 1)
    text(d, (80, 130), "KataPult", F["h1"], "white")
    text(d, (84, 225), "From scattered Bahasa prep\nto measurable daily practice", F["h2"], "white", 560)
    text(d, (86, 365), "Bahasa Prep Companion for focused I2 exam readiness.", F["body"], C["teal"], 520)
    for i, label in enumerate(["Bite-sized", "Modular", "Measurable"]):
        pill(d, (86 + i * 172, 465, 230 + i * 172, 510), label, "#1E293B", "white", F["small_b"])
    browser(d, s, "01-home.png", (740, 110, 1500, 690))
    paths.append(save(s, 1))

    s, d = base(False, "Problem", 2)
    text(d, (70, 120), "The gap was not content.\nIt was practice quality.", F["h2"], C["navy"], 780)
    text(d, (74, 235), "Preparing for I2 felt like collecting resources, not building readiness.", F["body"], C["muted"], 760)
    for i, (h, b, col) in enumerate([
        ("Scattered materials", "Notes, screenshots, PDFs and links lived in different places.", C["purple"]),
        ("Passive revision", "Hard topics needed retrieval practice, not rereading.", C["teal"]),
        ("No readiness visibility", "Learners could not see usage, weak areas, or momentum.", C["orange"]),
    ]):
        x = 90 + i * 490
        card(d, (x, 335, x + 420, 675))
        d.ellipse((x + 34, 370, x + 82, 418), fill=col)
        text(d, (x + 104, 372), h, F["h3"], C["navy"], 260)
        text(d, (x + 34, 465), b, F["body"], C["ink"], 330)
    paths.append(save(s, 2))

    s, d = base(True, "Why it matters", 3)
    text(d, (72, 122), "When every learner prepares alone,\nthe organisation loses reusable learning value.", F["h2"], "white", 970)
    card(d, (100, 280, 590, 685), fill="#172033", outline="#2B3650")
    text(d, (140, 320), "Before", F["h3"], "white")
    text(d, (160, 390), "Individual notes\nDuplicated effort\nNo shared usage data\nNo feedback loop", F["body"], C["slate2"], 360)
    pill(d, (690, 430, 910, 480), "KataPult converts", C["lime"], C["navy"], F["small_b"])
    card(d, (1010, 280, 1500, 685), fill="#F8FAFC", outline="#F8FAFC")
    text(d, (1050, 320), "After", F["h3"], C["navy"])
    text(d, (1070, 390), "Shared platform\nReusable content base\nMeasurable adoption\nEvidence for improvement", F["body"], C["ink"], 360)
    paths.append(save(s, 3))

    s, d = base(False, "Solution", 4)
    text(d, (70, 116), "KataPult turns exam readiness\ninto a daily practice loop.", F["h2"], C["navy"], 780)
    text(d, (74, 228), "A modular, gamified platform for short, focused Bahasa I2 practice.", F["body"], C["muted"], 700)
    for i, (label, col) in enumerate([("Choose module", C["purple"]), ("Practise actively", C["teal"]), ("Get feedback", C["orange"]), ("Track progress", C["green"])]):
        x = 95 + (i % 2) * 300
        y = 355 + (i // 2) * 130
        d.rounded_rectangle((x, y, x + 240, y + 84), radius=24, fill=col)
        text(d, (x + 25, y + 26), f"{i+1}. {label}", F["small_b"], "white" if col != C["lime"] else C["navy"])
    browser(d, s, "01-home.png", (900, 180, 1480, 600))
    text(d, (96, 645), "One loop. Multiple exam skills. Measurable learner behaviour.", F["body_b"], C["navy"])
    paths.append(save(s, 4))

    s, d = base(True, "Feature 1", 5)
    text(d, (74, 120), "Each module maps to a real exam skill.", F["h2"], "white", 820)
    text(d, (76, 190), "This is exam-specific practice, not generic language learning.", F["body"], C["teal"], 700)
    mods = [("Vocabulary", "Meaning + usage"), ("Imbuhan", "Word formation"), ("Persamaan", "Synonym precision"), ("Karangan", "Writing phrases"), ("Surat rasmi", "Structure + tone"), ("Flashcards", "Retention"), ("Custom test", "Exam pressure")]
    for i, (h, b) in enumerate(mods):
        x = 95 + (i % 4) * 355
        y = 285 + (i // 4) * 145
        card(d, (x, y, x + 310, y + 95), fill="#172033", outline="#2B3650")
        text(d, (x + 24, y + 18), h, F["body_b"], "white")
        text(d, (x + 24, y + 55), b, F["small"], C["slate2"])
    browser(d, s, "03-imbuhan.png", (805, 595, 1490, 820))
    paths.append(save(s, 5))

    s, d = base(False, "Feature 2", 6)
    text(d, (70, 118), "KataPult makes learners retrieve,\nnot reread.", F["h2"], C["navy"], 780)
    for x, head, items, col in [
        (90, "Passive notes", ["Read again", "Hope it sticks", "No correction", "Long study blocks"], C["red"]),
        (585, "Active recall", ["Answer a prompt", "Instant feedback", "Repeat weak skills", "5-minute drills"], C["green"]),
    ]:
        card(d, (x, 285, x + 410, 655))
        d.ellipse((x + 30, 325, x + 58, 353), fill=col)
        text(d, (x + 78, 318), head, F["h3"], C["navy"])
        text(d, (x + 50, 400), "\n".join(items), F["body"], C["ink"], 300)
    browser(d, s, "04-persamaan.png", (1080, 255, 1510, 595))
    pill(d, (1080, 640, 1510, 692), "Learning science, wrapped in a usable product", C["lime"], C["navy"], F["small_b"])
    paths.append(save(s, 6))

    s, d = base(True, "Feature 3", 7)
    text(d, (74, 120), "Gamification converts revision\ninto repeatable habit.", F["h2"], "white", 810)
    text(d, (76, 235), "Friendly motivation without losing exam seriousness.", F["body"], C["teal"], 650)
    for i, (h, b, col) in enumerate([("XP", "+50 per challenge", C["lime"]), ("Streak", "daily return cue", C["teal"]), ("Levels", "visible progress", C["purple"]), ("Lives", "stakes + focus", C["orange"])]):
        x = 100 + (i % 2) * 320
        y = 340 + (i // 2) * 135
        card(d, (x, y, x + 270, y + 95), fill="#172033", outline="#2B3650")
        d.ellipse((x + 22, y + 28, x + 46, y + 52), fill=col)
        text(d, (x + 62, y + 20), h, F["body_b"], "white")
        text(d, (x + 62, y + 56), b, F["small"], C["slate2"])
    browser(d, s, "07-daily-challenge.png", (780, 170, 1490, 675))
    pill(d, (100, 665, 640, 720), "Small wins, repeated often.", C["lime"], C["navy"], F["small_b"])
    paths.append(save(s, 7))

    s, d = base(False, "Feature 4", 8)
    text(d, (70, 118), "The app measures learning behaviour,\nnot just page visits.", F["h2"], C["navy"], 840)
    text(d, (74, 232), "This turns anecdotal adoption into measurable evidence.", F["body"], C["muted"], 740)
    for i, label in enumerate(["Unique learners", "Teams represented", "Sessions", "Active days", "Section visits", "Time per section", "Total session time"]):
        x = 90 + (i % 4) * 360
        y = 320 + (i // 4) * 125
        metric(d, (x, y, x + 310, y + 95), "[insert]", label)
    card(d, (100, 660, 1500, 765), fill=C["navy"], outline=C["navy"])
    text(d, (138, 682), "Tracked events: Section_Visited, Time_Spent_Section, Total_Session_Time", F["body_b"], "white")
    text(d, (138, 725), "PostHog columns: person, section, route, duration_seconds, reason, current URL.", F["small"], C["slate2"])
    paths.append(save(s, 8))

    s, d = base(True, "Demo", 9)
    text(d, (74, 120), "The demo follows a learner’s\n10-minute prep journey.", F["h2"], "white", 780)
    for i, (h, b) in enumerate([("Open home dashboard", "Learning path + motivation"), ("Practise vocabulary", "Meaning, usage, examples"), ("Drill imbuhan / persamaan", "Target weak exam skills"), ("Review flashcards", "Retention and recall"), ("Show analytics", "Evidence of adoption")]):
        y = 280 + i * 88
        d.ellipse((110, y, 158, y + 48), fill=C["lime"])
        text(d, (126, y + 8), str(i + 1), F["small_b"], C["navy"])
        text(d, (190, y - 2), h, F["body_b"], "white")
        text(d, (190, y + 33), b, F["small"], C["slate2"])
    browser(d, s, "06-test-setup.png", (780, 190, 1490, 680))
    paths.append(save(s, 9))

    s, d = base(False, "Impact", 10)
    text(d, (70, 118), "A personal prep tool became\na shared team learning asset.", F["h2"], C["navy"], 850)
    for i, label in enumerate(["Unique learners", "Teams represented", "Sessions", "Total practice minutes", "Active days", "Top 3 modules used"]):
        x = 90 + (i % 3) * 485
        y = 310 + (i // 3) * 135
        metric(d, (x, y, x + 410, y + 98), "[X]", label)
    pill(d, (100, 670, 665, 725), "Before: scattered, individual, unmeasured", C["navy"], "white", F["small_b"])
    pill(d, (750, 670, 1315, 725), "After: shared, reusable, measurable", C["lime"], C["navy"], F["small_b"])
    text(d, (100, 780), "Quote placeholder: “KataPult made it easier to practise the exact areas I was weak in.”", F["small"], C["muted"], 1100)
    paths.append(save(s, 10))

    s, d = base(True, "Close", 11)
    text(d, (80, 130), "Preparation that is accessible,\nhabitual, and measurable.", F["h2"], "white", 850)
    for i, (h, b, col) in enumerate([("Real pain point", "Built from lived prep friction", C["lime"]), ("Exam-specific", "Mapped to Bahasa I2 sub-skills", C["teal"]), ("Adopted beyond creator", "Used by colleagues across teams", C["purple"]), ("Instrumented", "Measures section visits and time spent", C["orange"])]):
        x = 110 + (i % 2) * 650
        y = 335 + (i // 2) * 145
        card(d, (x, y, x + 560, y + 100), fill="#172033", outline="#2B3650")
        d.ellipse((x + 28, y + 35, x + 52, y + 59), fill=col)
        text(d, (x + 78, y + 22), h, F["body_b"], "white")
        text(d, (x + 78, y + 60), b, F["small"], C["slate2"])
    pill(d, (350, 720, 1250, 780), "From personal pain point to team learning platform.", C["lime"], C["navy"], F["body_b"])
    paths.append(save(s, 11))
    return paths


def rels_xml(rels):
    body = "".join(f'<Relationship Id="{rid}" Type="{typ}" Target="{target}"/>' for rid, typ, target in rels)
    return f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">{body}</Relationships>'


def make_pptx(paths):
    overrides = "".join(f'<Override PartName="/ppt/slides/slide{i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>' for i in range(1, len(paths) + 1))
    content = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/><Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/><Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/><Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>{overrides}</Types>'''
    slide_ids = "".join(f'<p:sldId id="{255+i}" r:id="rId{i}"/>' for i in range(1, len(paths) + 1))
    pres = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId{len(paths)+1}"/></p:sldMasterIdLst><p:sldIdLst>{slide_ids}</p:sldIdLst><p:sldSz cx="{SW}" cy="{SH}" type="wide"/><p:notesSz cx="6858000" cy="9144000"/><p:defaultTextStyle/></p:presentation>'''
    slide_rels = [(f"rId{i}", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide", f"slides/slide{i}.xml") for i in range(1, len(paths) + 1)]
    slide_rels.append((f"rId{len(paths)+1}", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster", "slideMasters/slideMaster1.xml"))
    master = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld><p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/><p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst><p:txStyles><p:titleStyle/><p:bodyStyle/><p:otherStyle/></p:txStyles></p:sldMaster>'''
    layout = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank" preserve="1"><p:cSld name="Blank"><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>'''
    theme = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="KataPult V2"><a:themeElements><a:clrScheme name="KataPult V2"><a:dk1><a:srgbClr val="111827"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1><a:accent1><a:srgbClr val="C9F23A"/></a:accent1><a:accent2><a:srgbClr val="22D3EE"/></a:accent2><a:accent3><a:srgbClr val="7C5CFF"/></a:accent3><a:accent4><a:srgbClr val="FB923C"/></a:accent4><a:accent5><a:srgbClr val="22C55E"/></a:accent5><a:accent6><a:srgbClr val="667085"/></a:accent6><a:hlink><a:srgbClr val="22D3EE"/></a:hlink><a:folHlink><a:srgbClr val="7C5CFF"/></a:folHlink></a:clrScheme><a:fontScheme name="Segoe"><a:majorFont><a:latin typeface="Segoe UI Semibold"/></a:majorFont><a:minorFont><a:latin typeface="Segoe UI"/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst><a:lnStyleLst><a:ln w="9525"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements></a:theme>'''
    core = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>KataPult Innovation Award Showcase v2</dc:title><dc:creator>Codex</dc:creator></cp:coreProperties>'''
    app = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>Microsoft PowerPoint</Application><Slides>{len(paths)}</Slides></Properties>'''
    with zipfile.ZipFile(PPTX, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", content)
        z.writestr("_rels/.rels", rels_xml([("rId1", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument", "ppt/presentation.xml"), ("rId2", "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties", "docProps/core.xml"), ("rId3", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties", "docProps/app.xml")]))
        z.writestr("docProps/core.xml", core)
        z.writestr("docProps/app.xml", app)
        z.writestr("ppt/presentation.xml", pres)
        z.writestr("ppt/_rels/presentation.xml.rels", rels_xml(slide_rels))
        z.writestr("ppt/slideMasters/slideMaster1.xml", master)
        z.writestr("ppt/slideMasters/_rels/slideMaster1.xml.rels", rels_xml([("rId1", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout", "../slideLayouts/slideLayout1.xml"), ("rId2", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme", "../theme/theme1.xml")]))
        z.writestr("ppt/slideLayouts/slideLayout1.xml", layout)
        z.writestr("ppt/slideLayouts/_rels/slideLayout1.xml.rels", rels_xml([("rId1", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster", "../slideMasters/slideMaster1.xml")]))
        z.writestr("ppt/theme/theme1.xml", theme)
        for i, p in enumerate(paths, 1):
            z.write(p, f"ppt/media/slide{i:02d}.png")
            z.writestr(f"ppt/slides/slide{i}.xml", f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr><p:pic><p:nvPicPr><p:cNvPr id="2" name="Slide Render"/><p:cNvPicPr/><p:nvPr/></p:nvPicPr><p:blipFill><a:blip r:embed="rId1"/><a:stretch><a:fillRect/></a:stretch></p:blipFill><p:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{SW}" cy="{SH}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr></p:pic></p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>''')
            z.writestr(f"ppt/slides/_rels/slide{i}.xml.rels", rels_xml([("rId1", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", f"../media/slide{i:02d}.png"), ("rId100", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout", "../slideLayouts/slideLayout1.xml")]))


def esc(s):
    return html.escape(str(s), quote=False)


def make_blueprint():
    rows = [
        ("1. KataPult", "Make the project memorable.", "Hero cover: dark background, product mockup on right.", "KataPult; From scattered Bahasa prep to measurable daily practice; Bahasa Prep Companion for focused I2 exam readiness.", "Deep navy, lime accent rule, browser-frame screenshot.", "01-home.png", "This began as a personal prep problem, but the result is a reusable practice platform for Bahasa I2 learners.", "Creates a product-led opening, not an internal report."),
        ("2. The real problem", "The gap was not content. It was practice quality.", "Three pain cards with one personal trigger line.", "Scattered materials; Passive revision; No readiness visibility. Personal trigger: Preparing for I2 felt like collecting resources, not building readiness.", "Light background, premium cards, numbered accents.", "None.", "Frame the problem as specific: learners had resources, but not a system for repeated retrieval and feedback.", "Replaces generic problem wording with a memorable insight."),
        ("3. Why this matters", "Solo prep wastes reusable organisational learning value.", "Before vs after contrast.", "Before: individual notes, duplicated effort, no shared usage data, no feedback loop. After: shared platform, reusable content, measurable adoption, evidence for improvement.", "Dark slide with two high-contrast panels.", "None.", "Explain why this matters beyond you: colleagues were preparing independently with no shared asset.", "Makes the award case operational, not just personal."),
        ("4. Solution overview", "KataPult turns exam readiness into a daily practice loop.", "Four-step loop plus app mockup.", "Choose module -> Practise actively -> Get feedback -> Track progress. A modular, gamified platform for short, focused Bahasa I2 practice.", "Loop cards with screenshot in browser frame.", "01-home.png.", "Walk the panel through the product logic in one sentence and one loop.", "Prevents feature dumping; establishes a simple mental model."),
        ("5. Modular exam practice", "Each module maps to a real exam skill.", "Module grid plus focused screenshot.", "Vocabulary: meaning + usage; Imbuhan: word formation; Persamaan: synonym precision; Karangan: writing phrases; Surat rasmi: structure + tone; Flashcards: retention; Custom test: exam pressure.", "Dark product grid with screenshot strip.", "03-imbuhan.png plus optional module screenshots.", "Stress that this is not generic language learning. It targets Bahasa I2 sub-skills.", "Shows specificity, which award panels reward."),
        ("6. Active recall and feedback", "KataPult makes learners retrieve, not reread.", "Side-by-side: passive prep vs active recall.", "Passive: read notes, hope it sticks, no correction, long blocks. Active: answer prompt, instant feedback, repeat weak skills, 5-minute drills.", "Clean comparison cards with one practice screenshot.", "04-persamaan.png.", "Explain the learning science in plain English: retrieval plus feedback beats rereading.", "Turns UI into learning rationale."),
        ("7. Gamified habit loop", "Gamification converts revision into repeatable habit.", "Daily challenge screenshot plus four mechanic cards.", "XP, streaks, levels, daily challenge, limited lives. Designed for busy officers: small wins, repeated often.", "Dark friendly game-like slide, restrained.", "07-daily-challenge.png.", "Show why users come back: progress is visible and sessions feel achievable.", "Positions gamification as behavioural design, not decoration."),
        ("8. Measurable learning loop", "The app measures learning behaviour, not just page visits.", "Analytics mockup with metric tiles.", "Unique learners, teams represented, sessions, active days, section visits, time per section, total session time.", "Light dashboard style with metric cards.", "PostHog screenshot if available.", "Say this turns anecdotal adoption into evidence by person, section, and time spent.", "This is the innovation proof layer."),
        ("9. Demo storyboard", "The demo follows a learner's 10-minute prep journey.", "Five-step timeline with one screenshot.", "Open dashboard -> practise vocabulary -> drill imbuhan/persamaan -> review flashcards -> generate custom test and show analytics.", "Dark timeline, screenshot on right.", "06-test-setup.png plus live demo.", "Use this as the live demo navigation slide.", "Makes demo intentional rather than a random app tour."),
        ("10. Impact and adoption", "A personal prep tool became a shared team learning asset.", "Evidence blocks and before/after bar.", "[X] unique learners, [X] teams, [X] sessions, [X] total minutes, [X] active days, top 3 modules, one learner quote.", "Metric cards with placeholders clearly marked.", "PostHog evidence screenshot; adoption evidence.", "Be honest: insert actual numbers before submission, but the evidence model is ready.", "Gives panel measurable proof instead of vague impact claims."),
        ("11. Closing", "Preparation that is accessible, habitual, and measurable.", "Four closing pillars.", "Built from real learner pain point; designed around exam sub-skills; adopted beyond creator; instrumented for measurable behaviour. End: From personal pain point to team learning platform.", "Dark close, four pillars, lime final line.", "Optional app hero screenshot.", "Land the award message in one sentence.", "Leaves the panel with a crisp innovation thesis."),
    ]
    table = "| Slide title | One-line key message | Recommended layout | Exact slide copy | Visual treatment | Screenshot/demo asset | Speaker note | Design rationale |\n|---|---|---|---|---|---|---|---|\n"
    for row in rows:
        table += "| " + " | ".join(esc(x) for x in row) + " |\n"
    BLUEPRINT.write_text(f"""# KataPult Innovation Award Pitch Blueprint

## Slide-by-slide table

{table}

## 3-minute demo script

**0:00-0:25 - Set the context.** KataPult started from a practical problem: Bahasa I2 prep was scattered across notes, screenshots, links and memory. The issue was not content. It was the lack of structured, repeatable practice.

**0:25-0:55 - Home dashboard.** Show the learning path, XP/streak, and modules. The home screen turns preparation into a guided routine: build vocabulary, form words, then test yourself.

**0:55-1:25 - Vocabulary.** Show example sentence and translation. This supports recall in context rather than isolated word memorisation.

**1:25-1:55 - Imbuhan or Persamaan.** Show active prompt and feedback. These are specific exam pain points where learners need repeated retrieval and instant correction.

**1:55-2:25 - Flashcards / Custom test.** Show review and pressure testing. Learners can switch from light retention to focused assessment without leaving the platform.

**2:25-3:00 - Analytics.** Show PostHog events. The platform now tracks section visits, time spent per section, total session time and adoption by person.

## 60-second verbal pitch

KataPult is a Bahasa Prep Companion built for Bahasa Indonesia I2 exam preparation. The starting pain point was simple: learners had content, but preparation was scattered and passive. Notes, screenshots, links and ad hoc quizzes did not create a repeatable practice routine. KataPult turns that into one modular platform where learners practise by exam skill: vocabulary, imbuhan, persamaan, karangan phrases, surat rasmi, flashcards and custom tests. The design is intentionally bite-sized so busy officers can practise in 5 to 10 minute sessions. It uses active recall, instant feedback and gamification through XP, streaks, levels and daily challenges to make revision habitual. Most importantly, it is measurable: we can track unique learners, section visits, time spent per section and total session time. What began as a personal prep tool has become a reusable team learning asset adopted by colleagues across teams. KataPult is innovation because it makes preparation accessible, habitual and evidence-based.

## Design system

- **Theme:** modern edtech product showcase, premium but friendly.
- **Fonts:** Segoe UI Semibold for titles; Segoe UI / Aptos for body.
- **Palette:** deep navy `#0B1026`, charcoal `#111827`, off-white `#F8FAFC`, lime `#C9F23A`, teal `#22D3EE`, purple `#7C5CFF`, muted grey `#667085`.
- **Icon style:** simple line icons or numbered pills. Avoid generic clipart.
- **Screenshot treatment:** use browser frames, crop to the active learning area, and use screenshots as evidence.
- **Text reduction rules:** title is the claim; max 25 words on product slides; replace bullets with cards; remove "this app allows users to" phrasing.
- **Animation style:** fade titles, appear loop steps one at a time, use Morph for before/after if available, avoid gimmicky transitions.

## Evidence checklist

- Unique learners from PostHog.
- Teams represented.
- Sessions in submission period.
- Total practice minutes.
- Active days since launch.
- Top 3 modules by visits.
- Top 3 modules by time spent.
- Screenshot of `katapult_Section_Visited`.
- Screenshot of `katapult_Time_Spent_Section` with `duration_seconds`, `section`, and `route`.
- One short colleague quote.
- One concrete personal anecdote on why the app was built.
- Optional 30 to 60 second screen recording of the demo flow.
""", encoding="utf-8")


if __name__ == "__main__":
    paths = make_slides()
    make_pptx(paths)
    make_blueprint()
    with zipfile.ZipFile(PPTX) as z:
        for part in ["[Content_Types].xml", "ppt/presentation.xml", "ppt/slides/slide1.xml", "ppt/slides/slide11.xml"]:
            ET.fromstring(z.read(part))
    print(PPTX)
    print(BLUEPRINT)
