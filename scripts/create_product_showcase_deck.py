from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import zipfile
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "award-demo-assets"
OUT = ROOT / "award-submission-package"
SLIDES_DIR = OUT / "product_showcase_6_slide_renders"
PPTX = OUT / "KataPult_Product_Showcase_6slides.pptx"
BLUEPRINT = OUT / "KataPult_Product_Showcase_6slides_blueprint.md"

W, H = 1600, 900
EMU = 914400
SW, SH = int(13.333333 * EMU), int(7.5 * EMU)
C = {
    "navy": "#0B1026",
    "ink": "#121826",
    "muted": "#667085",
    "off": "#F8FAFC",
    "white": "#FFFFFF",
    "line": "#D7DCE5",
    "lime": "#C9F23A",
    "card_dark": "#172033",
    "teal": "#22D3EE",
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
    "hero": font(66, True),
    "h1": font(46, True),
    "h2": font(34, True),
    "body": font(22),
    "body_b": font(22, True),
    "small": font(17),
    "small_b": font(17, True),
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


def text(draw, xy, body, fnt, fill, max_w=None, spacing=1.18):
    x, y = xy
    lines = []
    for para in str(body).split("\n"):
        lines.extend(wrap(draw, para, fnt, max_w) if max_w else [para])
    for line in lines:
        draw.text((x, y), line, font=fnt, fill=fill)
        y += int(fnt.size * spacing)
    return y


def pill(draw, box, label, fill, fg):
    draw.rounded_rectangle(box, radius=22, fill=fill)
    b = draw.textbbox((0, 0), label, font=F["small_b"])
    draw.text((box[0] + (box[2] - box[0] - (b[2] - b[0])) / 2, box[1] + (box[3] - box[1] - (b[3] - b[1])) / 2 - 1), label, font=F["small_b"], fill=fg)


def card(draw, box, fill=C["white"], outline=C["line"], radius=28):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=2)


def shot(name, size):
    img = Image.open(ASSETS / name).convert("RGB")
    img.thumbnail(size)
    canvas = Image.new("RGB", size, C["white"])
    canvas.paste(img, ((size[0] - img.width) // 2, (size[1] - img.height) // 2))
    return canvas


def browser(draw, slide, name, box):
    x1, y1, x2, y2 = box
    card(draw, box, fill=C["white"], outline="#293449", radius=24)
    draw.rounded_rectangle((x1, y1, x2, y1 + 42), radius=24, fill="#EEF2F7")
    for i, col in enumerate(["#EF4444", "#FACC15", "#22C55E"]):
        draw.ellipse((x1 + 24 + i * 28, y1 + 15, x1 + 38 + i * 28, y1 + 29), fill=col)
    slide.paste(shot(name, (x2 - x1 - 34, y2 - y1 - 60)), (x1 + 17, y1 + 50))


def base(dark=False, num=1, label=None):
    slide = Image.new("RGB", (W, H), C["navy"] if dark else C["off"])
    d = ImageDraw.Draw(slide)
    if dark:
        d.rectangle((0, 0, W, 18), fill=C["lime"])
    if label:
        pill(d, (70, 48, 245, 88), label.upper(), C["lime"] if dark else C["navy"], C["navy"] if dark else C["white"])
    d.text((W - 92, H - 58), f"{num:02d}", font=F["small_b"], fill=C["white"] if dark else C["muted"])
    return slide, d


def save(slide, n):
    p = SLIDES_DIR / f"slide{n:02d}.png"
    slide.save(p)
    return p


def make_slides():
    OUT.mkdir(exist_ok=True)
    SLIDES_DIR.mkdir(exist_ok=True)
    paths = []

    s, d = base(True, 1, "Product demo")
    text(d, (86, 135), "KataPult", F["hero"], C["white"])
    text(d, (90, 238), "Bahasa I2 prep,\nrebuilt as daily practice.", F["h1"], C["white"], 610)
    text(d, (92, 395), "Structured drills. Fast feedback. Measurable usage.", F["body"], C["teal"], 560)
    for i, label in enumerate(["40++ users", "4+ entities", "5-10 min drills"]):
        pill(d, (92 + i * 178, 495, 252 + i * 178, 543), label, "#1E293B", C["white"])
    browser(d, s, "01-home.png", (735, 110, 1510, 700))
    paths.append(save(s, 1))

    s, d = base(False, 2, "Problem")
    text(d, (72, 125), "The issue was not lack of content.\nIt was lack of practice quality.", F["h1"], C["ink"], 880)
    text(d, (76, 255), "I2 prep was becoming a folder of screenshots instead of a routine.", F["body"], C["muted"], 820)
    for i, (h, b) in enumerate([
        ("Scattered sources", "Notes, PDFs, links, Quizlet, internet and LLM outputs."),
        ("Passive revision", "Reading lists did not drill weak areas."),
        ("No feedback loop", "No shared view of usage, progress or readiness."),
    ]):
        x = 92 + i * 490
        card(d, (x, 380, x + 420, 680))
        text(d, (x + 34, 420), h, F["h2"], C["ink"], 330)
        text(d, (x + 34, 505), b, F["body"], C["muted"], 330)
    paths.append(save(s, 2))

    s, d = base(True, 3, "Solution")
    text(d, (78, 128), "One platform for short,\nexam-specific practice.", F["h1"], C["white"], 800)
    for i, label in enumerate(["Choose skill", "Drill actively", "Get feedback", "Track usage"]):
        y = 310 + i * 92
        d.ellipse((105, y, 153, y + 48), fill=C["lime"])
        text(d, (121, y + 7), str(i + 1), F["small_b"], C["navy"])
        text(d, (180, y + 8), label, F["body_b"], C["white"])
    browser(d, s, "03-imbuhan.png", (765, 145, 1495, 690))
    paths.append(save(s, 3))

    s, d = base(False, 4, "Content")
    text(d, (72, 118), "Built around the actual exam components.", F["h1"], C["ink"], 900)
    metrics = [
        ("583", "Vocabulary"),
        ("666", "Imbuhan"),
        ("305", "Persamaan"),
        ("297", "Karangan"),
        ("23", "Flashcard sets"),
        ("8", "Surat rasmi sections"),
        ("971", "Custom test bank"),
        ("10/day", "Daily challenge"),
    ]
    for i, (v, lab) in enumerate(metrics):
        x = 90 + (i % 4) * 360
        y = 250 + (i // 4) * 165
        card(d, (x, y, x + 310, y + 112))
        text(d, (x + 28, y + 22), v, F["h2"], C["navy"])
        text(d, (x + 28, y + 72), lab, F["small"], C["muted"])
    text(d, (92, 635), "Daily challenge draws from a 1,554-item pool across vocabulary, imbuhan and persamaan.", F["body_b"], C["ink"], 1200)
    paths.append(save(s, 4))

    s, d = base(True, 5, "Demo flow")
    text(d, (76, 125), "A 10-minute learner journey.", F["h1"], C["white"], 780)
    steps = ["Open dashboard", "Practise vocabulary", "Drill imbuhan or persamaan", "Review flashcards", "Run custom test"]
    for i, step in enumerate(steps):
        y = 265 + i * 84
        d.ellipse((105, y, 151, y + 46), fill=C["lime"])
        text(d, (121, y + 7), str(i + 1), F["small_b"], C["navy"])
        text(d, (180, y + 8), step, F["body_b"], C["white"])
    browser(d, s, "06-test-setup.png", (770, 145, 1495, 690))
    paths.append(save(s, 5))

    s, d = base(False, 6, "Impact")
    text(d, (72, 118), "From personal prep tool\nto shared learning asset.", F["h1"], C["ink"], 860)
    for i, (v, lab) in enumerate([
        ("40++", "users reached"),
        ("4+", "entities represented"),
        ("[insert]", "sessions"),
        ("[insert]", "practice minutes"),
        ("[insert]", "active days"),
        ("[insert]", "top modules"),
    ]):
        x = 90 + (i % 3) * 485
        y = 310 + (i // 3) * 145
        card(d, (x, y, x + 410, y + 105))
        text(d, (x + 28, y + 20), v, F["h2"], C["navy"])
        text(d, (x + 28, y + 72), lab, F["small"], C["muted"])
    pill(d, (100, 690, 695, 745), "Before: scattered, solo, unmeasured", C["navy"], C["white"])
    pill(d, (765, 690, 1375, 745), "After: shared, structured, measurable", C["lime"], C["navy"])
    paths.append(save(s, 6))
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
    theme = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="KataPult Product"><a:themeElements><a:clrScheme name="KataPult Product"><a:dk1><a:srgbClr val="0B1026"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1><a:accent1><a:srgbClr val="C9F23A"/></a:accent1><a:accent2><a:srgbClr val="22D3EE"/></a:accent2><a:accent3><a:srgbClr val="667085"/></a:accent3><a:accent4><a:srgbClr val="111827"/></a:accent4><a:accent5><a:srgbClr val="F8FAFC"/></a:accent5><a:accent6><a:srgbClr val="D7DCE5"/></a:accent6><a:hlink><a:srgbClr val="22D3EE"/></a:hlink><a:folHlink><a:srgbClr val="22D3EE"/></a:folHlink></a:clrScheme><a:fontScheme name="Segoe"><a:majorFont><a:latin typeface="Segoe UI Semibold"/></a:majorFont><a:minorFont><a:latin typeface="Segoe UI"/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst><a:lnStyleLst><a:ln w="9525"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements></a:theme>'''
    core = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>KataPult Product Showcase</dc:title><dc:creator>Codex</dc:creator></cp:coreProperties>'''
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


def make_blueprint():
    BLUEPRINT.write_text("""# KataPult 6-slide Product Showcase

## Revised structure

1. KataPult - Bahasa I2 prep, rebuilt as daily practice.
2. Problem - The issue was not lack of content; it was lack of practice quality.
3. Solution - One platform for short, exam-specific practice.
4. Content coverage - Built around the actual exam components.
5. Demo flow - A 10-minute learner journey.
6. Impact - From personal prep tool to shared learning asset.

## Slide-by-slide copy and notes

| Slide | Copy | Visual | Speaker note |
|---|---|---|---|
| 1 | KataPult. Bahasa I2 prep, rebuilt as daily practice. Structured drills. Fast feedback. Measurable usage. | Home screenshot in laptop mockup. Metric pills: 40++ users, 4+ entities, 5-10 min drills. | Position KataPult as a product, not a folder of study notes. |
| 2 | The issue was not lack of content. It was lack of practice quality. | Three pain cards: scattered sources, passive revision, no feedback loop. | Explain that prep was becoming a folder of screenshots instead of a routine. |
| 3 | One platform for short, exam-specific practice. | Loop: choose skill, drill actively, get feedback, track usage. Screenshot: Imbuhan. | Show how the app turns materials into repeatable practice. |
| 4 | Built around the actual exam components. | Metric grid: 583 vocab, 666 imbuhan, 305 persamaan, 297 karangan, 23 flashcard sets, 8 surat rasmi sections, 971 custom test bank, 10/day daily challenge. | Use this slide to prove scale and specificity. |
| 5 | A 10-minute learner journey. | Five-step demo timeline with custom test screenshot. | Use this as the live demo map. |
| 6 | From personal prep tool to shared learning asset. | Impact metrics: 40++ users, 4+ entities, placeholders for sessions/minutes/active days/top modules. | Be clear that usage logging has just started; fill placeholders once data matures. |

## Stronger impact categories

- Reach: 40++ users.
- Spread: users from at least 4 entities.
- Coverage: 1,554-item daily challenge pool across vocabulary, imbuhan and persamaan.
- Depth: 971-item custom test bank.
- Behaviour evidence: section visits, time per section and session time now instrumented.

## Design system

- Background: deep navy `#0B1026` and off-white `#F8FAFC`.
- Accent: lime `#C9F23A` only.
- Font: Segoe UI / Aptos.
- Screenshot style: rounded browser/laptop frames.
- Spacing: 70px outer margin; 28px card radius; large titles.
- Text limit: max 35 words per slide except metric labels.

## What to delete from current deck

- Long paragraphs explaining every feature.
- Repeated problem statements.
- Generic claims such as improves learning, empowers users, increases efficiency.
- Any slide that lists features without linking them to Bahasa I2 exam components.
- Extra feature-highlight slides that can be merged into the content coverage slide.
- Dense analytics explanation before usage data is mature.
""", encoding="utf-8")


if __name__ == "__main__":
    paths = make_slides()
    make_pptx(paths)
    make_blueprint()
    with zipfile.ZipFile(PPTX) as z:
        for part in ["[Content_Types].xml", "ppt/presentation.xml", "ppt/slides/slide1.xml", "ppt/slides/slide6.xml"]:
            ET.fromstring(z.read(part))
    print(PPTX)
    print(BLUEPRINT)
