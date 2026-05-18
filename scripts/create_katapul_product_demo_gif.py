from pathlib import Path
import shutil

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

from create_refined_katapul_showcase import (
    ASSETS,
    PACKAGE,
    COL,
    GF,
    rgb,
    rgba,
    clamp,
    ease,
    ease_out,
    rounded,
    shadow,
    draw_text,
    para,
    load_shot,
)

GW, GH = 1280, 720
FPS_MP4 = 24
FPS_GIF = 12
DURATION = 16.0

OUT_DIR = PACKAGE / "katapult_product_demo_gif"
FRAME_DIR = OUT_DIR / "frames"
GIF_PATH = PACKAGE / "KataPult_Product_Demo_Walkthrough.gif"
MP4_PATH = PACKAGE / "KataPult_Product_Demo_Walkthrough.mp4"
CONTACT_PATH = OUT_DIR / "_gif_contact_sheet.png"


def blend(a, b, t):
    return int(a + (b - a) * t)


def mix_color(c1, c2, t):
    r1, g1, b1 = rgb(c1)
    r2, g2, b2 = rgb(c2)
    return (blend(r1, r2, t), blend(g1, g2, t), blend(b1, b2, t), 255)


def move(start, end, t):
    return (
        int(start[0] + (end[0] - start[0]) * t),
        int(start[1] + (end[1] - start[1]) * t),
        int(start[2] + (end[2] - start[2]) * t),
        int(start[3] + (end[3] - start[3]) * t),
    )


def base():
    img = Image.new("RGBA", (GW, GH), rgba(COL["paper"]))
    d = ImageDraw.Draw(img, "RGBA")
    for x in range(64, GW, 160):
        d.line((x, 92, x, GH - 52), fill=rgba(COL["line"], 24), width=1)
    d.line((56, 68, GW - 56, 68), fill=COL["line"], width=1)
    draw_text(d, (58, 34), "KataPult", GF["small_b"], COL["ink"])
    draw_text(d, (148, 34), "Bahasa Indo Practice Companion", GF["small"], COL["subtle"])
    return img


def fade_layer(layer, alpha):
    if alpha >= 1:
        return layer
    out = layer.copy()
    out.putalpha(out.getchannel("A").point(lambda v: int(v * alpha)))
    return out


def chip(draw, box, label, alpha=1, fill=None, accent=COL["green"], size="normal"):
    fill = fill or COL["white"]
    fa = int(255 * alpha)
    rounded(draw, box, rgba(fill, fa), outline=rgba(COL["line"], fa), radius=13, width=1)
    draw.rounded_rectangle((box[0] + 14, box[1] + 13, box[0] + 20, box[3] - 13), radius=3, fill=rgba(accent, fa))
    fnt = GF["small_b"] if size == "normal" else GF["tiny"]
    draw_text(draw, (box[0] + 34, box[1] + 12), label, fnt, rgba(COL["ink"], fa))


def browser(layer, box, screenshot, scale=1.0, alpha=1.0):
    overlay = Image.new("RGBA", (GW, GH), (0, 0, 0, 0))
    x1, y1, x2, y2 = box
    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2
    bw, bh = (x2 - x1) * scale, (y2 - y1) * scale
    x1, y1, x2, y2 = int(cx - bw / 2), int(cy - bh / 2), int(cx + bw / 2), int(cy + bh / 2)
    shadow(overlay, (x1, y1, x2, y2), blur=18, alpha=int(34 * alpha), radius=22)
    d = ImageDraw.Draw(overlay, "RGBA")
    rounded(d, (x1, y1, x2, y2), rgba(COL["white"], int(255 * alpha)), outline=rgba(COL["line"], int(255 * alpha)), radius=22)
    rounded(d, (x1, y1, x2, y1 + 34), rgba("#E8ECEF", int(255 * alpha)), radius=22)
    for i, c in enumerate(["#E36F66", "#E2B646", "#55B983"]):
        d.ellipse((x1 + 18 + i * 22, y1 + 12, x1 + 29 + i * 22, y1 + 23), fill=rgba(c, int(255 * alpha)))
    d.rounded_rectangle((x1 + 136, y1 + 12, x2 - 24, y1 + 23), radius=5, fill=rgba("#D7DEE6", int(255 * alpha)))
    shot = load_shot(screenshot, (x2 - x1 - 24, y2 - y1 - 46))
    if alpha < 1:
        shot.putalpha(shot.getchannel("A").point(lambda v: int(v * alpha)))
    overlay.alpha_composite(shot, (x1 + 12, y1 + 40))
    layer.alpha_composite(overlay)
    return (x1, y1, x2, y2)


def cursor(draw, x, y, alpha=1.0):
    fa = int(255 * alpha)
    pts = [(x, y), (x, y + 34), (x + 10, y + 26), (x + 18, y + 44), (x + 28, y + 39), (x + 19, y + 22), (x + 32, y + 22)]
    draw.polygon(pts, fill=rgba(COL["ink"], fa))
    draw.line(pts + [pts[0]], fill=rgba(COL["white"], fa), width=1)


def study_set_card(draw, box, p=1.0):
    rounded(draw, box, COL["white"], outline=COL["line"], radius=20, width=1)
    draw_text(draw, (box[0] + 34, box[1] + 26), "Practice set", GF["h2"], COL["ink"])
    draw_text(draw, (box[0] + 34, box[1] + 60), "One topic, ready to review and test", GF["small"], COL["muted"])
    y = box[1] + 108
    rows = [
        ("Topic cards", "Formal-letter openings"),
        ("Question bank", "Reusable practice items"),
        ("Feedback", "Right/wrong + explanation"),
        ("Practice button", "Start a short drill"),
    ]
    for i, (h, b) in enumerate(rows):
        reveal = ease_out(p * 1.8 - i * 0.25)
        if reveal <= 0:
            continue
        x = int(box[0] + 34 + (1 - reveal) * 28)
        yy = y + i * 54
        rounded(draw, (x, yy, box[2] - 34, yy + 40), rgba(COL["soft2"], int(255 * reveal)), outline=rgba(COL["line"], int(255 * reveal)), radius=12)
        draw_text(draw, (x + 18, yy + 8), h, GF["small_b"], rgba(COL["ink"], int(255 * reveal)))
        draw_text(draw, (x + 164, yy + 9), b, GF["small"], rgba(COL["muted"], int(255 * reveal)))
    draw.rounded_rectangle((box[0] + 34, box[3] - 54, box[2] - 34, box[3] - 42), radius=6, fill=COL["soft"])
    draw.rounded_rectangle((box[0] + 34, box[3] - 54, int(box[0] + 34 + (box[2] - box[0] - 68) * (0.18 + 0.45 * p)), box[3] - 42), radius=6, fill=COL["green"])
    draw_text(draw, (box[0] + 34, box[3] - 30), "Progress: 6 of 12 reviewed", GF["tiny"], COL["muted"])


def mini_feedback(draw, box, p):
    rounded(draw, box, COL["white"], outline=COL["line"], radius=18, width=1)
    draw_text(draw, (box[0] + 26, box[1] + 22), "Imbuhan practice", GF["h2"], COL["ink"])
    draw_text(draw, (box[0] + 26, box[1] + 58), "Answer, then understand why", GF["small"], COL["muted"])
    rounded(draw, (box[0] + 30, box[1] + 98, box[2] - 30, box[1] + 154), COL["soft2"], outline=COL["line"], radius=12)
    draw_text(draw, (box[0] + 54, box[1] + 116), "Jalan raya dibina untuk ____ peraturan.", GF["small_b"], COL["ink"])
    typed = "mematuhi"[: int(7 * clamp((p - 0.14) / 0.32))]
    rounded(draw, (box[0] + 30, box[1] + 178, box[2] - 190, box[1] + 224), COL["white"], outline=COL["green"], radius=10)
    draw_text(draw, (box[0] + 48, box[1] + 191), typed or "Ketik jawaban...", GF["small_b"], COL["ink"] if typed else COL["muted"])
    btn_col = COL["green"] if p > 0.5 else COL["soft"]
    rounded(draw, (box[2] - 170, box[1] + 178, box[2] - 30, box[1] + 224), btn_col, radius=10)
    draw_text(draw, (box[2] - 100, box[1] + 191), "Check", GF["small_b"], COL["white"] if p > 0.5 else COL["muted"], anchor="ma")
    if p > 0.48:
        a = ease_out((p - 0.48) / 0.18)
        rounded(draw, (box[0] + 30, box[1] + 244, box[2] - 30, box[1] + 292), rgba("#EEF6E8", int(255 * a)), outline=rgba(COL["green"], int(255 * a)), radius=12)
        draw_text(draw, (box[0] + 52, box[1] + 260), "Correct answer selected.", GF["small_b"], rgba(COL["ink"], int(255 * a)))
    if p > 0.58:
        a = ease_out((p - 0.58) / 0.18)
        rounded(draw, (box[0] + 30, box[1] + 306, box[2] - 30, box[1] + 378), rgba(COL["soft2"], int(255 * a)), outline=rgba(COL["line"], int(255 * a)), radius=12)
        draw_text(draw, (box[0] + 52, box[1] + 322), "LLM-generated explanation", GF["small_b"], rgba(COL["ink"], int(255 * a)))
        para(draw, (box[0] + 52, box[1] + 348), "Shows why the answer fits, so learners can understand the rule.", GF["tiny"], rgba(COL["muted"], int(255 * a)), box[2] - box[0] - 104, gap=3)


def scene_problem(p):
    img = base()
    d = ImageDraw.Draw(img, "RGBA")
    g = ease_out(p)
    para(d, (58, 124), "The material\nwas there.", GF["hero"], COL["ink"], 440, gap=6)
    draw_text(d, (58, 238), "The hard part was knowing what to revise next.", GF["body"], COL["muted"])
    starts = [
        (-220, 342, -22, 386),
        (88, 746, 286, 790),
        (-180, 492, 18, 536),
        (364, 770, 562, 814),
        (96, -62, 332, -18),
        (500, 820, 698, 864),
    ]
    ends = [
        (82, 332, 316, 376),
        (148, 402, 354, 446),
        (72, 476, 306, 520),
        (358, 348, 560, 392),
        (392, 420, 654, 464),
        (326, 504, 520, 548),
    ]
    labels = ["Online references", "Notes", "Screenshots", "Recall packs", "Generated material", "Raw lists"]
    for i, label in enumerate(labels):
        local = ease_out(p * 1.5 - i * 0.08)
        if local > 0:
            b = move(starts[i], ends[i], local)
            chip(d, b, label, alpha=local, accent=[COL["green"], COL["teal"], COL["amber"]][i % 3])
    rounded(d, (744, 252, 1176, 360), COL["white"], outline=COL["line"], radius=20)
    draw_text(d, (778, 284), "Where do I continue?", GF["h2"], COL["ink"])
    draw_text(d, (778, 324), "The next step is not obvious.", GF["small"], COL["muted"])
    if g > 0.65:
        a = ease_out((g - 0.65) / 0.22)
        rounded(d, (800, 424, 1128, 488), rgba(COL["soft"], int(255 * a)), outline=rgba(COL["line"], int(255 * a)), radius=18)
        draw_text(d, (964, 448), "Too much setup before practice", GF["h2"], rgba(COL["ink"], int(255 * a)), anchor="ma")
    return img


def scene_grouping(p):
    img = base()
    d = ImageDraw.Draw(img, "RGBA")
    draw_text(d, (58, 122), "Centralise materials\nin one place.", GF["hero"], COL["ink"])
    draw_text(d, (58, 236), "Notes, cards, drills, quizzes and explanations stay together.", GF["body"], COL["muted"])
    labels = ["Notes", "Screenshots", "Recall packs", "Generated material"]
    start_boxes = [(78, 344 + i * 58, 322, 386 + i * 58) for i in range(4)]
    sink = [(450, 304 + i * 18, 690, 346 + i * 18) for i in range(4)]
    card_box = (720, 150, 1168, 626)
    for i, label in enumerate(labels):
        t = ease_out((p - i * 0.05) / 0.55)
        b = move(start_boxes[i], sink[i], t)
        alpha = 1 - clamp((p - 0.56) / 0.22)
        chip(d, b, label, alpha=max(alpha, 0), accent=[COL["green"], COL["teal"], COL["amber"], COL["green2"]][i])
    if p > 0.44:
        study_set_card(d, card_box, ease_out((p - 0.44) / 0.48))
    rounded(d, (432, 274, 662, 394), COL["white"], outline=COL["line"], radius=18)
    draw_text(d, (547, 310), "KataPult", GF["h2"], COL["green"], anchor="ma")
    draw_text(d, (547, 350), "organises content", GF["small_b"], COL["ink"], anchor="ma")
    if p > 0.36:
        a = ease_out((p - 0.36) / 0.24)
        d.line((666, 334, 704, 334), fill=rgba(COL["green"], int(255 * a)), width=4)
        d.polygon([(704, 334), (690, 326), (690, 342)], fill=rgba(COL["green"], int(255 * a)))
    return img


def scene_app_walkthrough(p):
    img = base()
    d = ImageDraw.Draw(img, "RGBA")
    draw_text(d, (58, 112), "Open. Practise.\nUnderstand.", GF["hero"], COL["ink"])
    draw_text(d, (58, 230), "A short path from topic to feedback.", GF["body"], COL["muted"])
    shots = [
        ("01-home.png", "Choose a practice mode", "Home gives the next action"),
        ("05-flashcards.png", "Review a topic pack", "Essay phrases and topic points"),
        ("07-daily-challenge.png", "Start a daily drill", "Mixed questions with progress"),
        ("03-imbuhan.png", "Get feedback", "Right/wrong plus explanation"),
    ]
    seg = min(3, int(p * len(shots)))
    local = p * len(shots) - seg
    shot, label, sub = shots[seg]
    prev_shot = shots[max(0, seg - 1)][0]
    if seg > 0 and local < 0.12:
        browser(img, (506, 104, 1192, 604), prev_shot, scale=1.0, alpha=1 - local / 0.12)
    box = browser(img, (506, 104, 1192, 604), shot, scale=0.982 + 0.018 * ease(local), alpha=clamp(local / 0.12) if seg > 0 and local < 0.12 else 1)
    rounded(d, (58, 342, 418, 424), COL["white"], outline=COL["line"], radius=16)
    draw_text(d, (84, 362), label, GF["h2"], COL["ink"])
    draw_text(d, (84, 396), sub, GF["small"], COL["muted"])
    steps = ["Home", "Topic pack", "Daily drill", "Feedback"]
    for i, s in enumerate(steps):
        x = 58 + i * 91
        fill = COL["green"] if i <= seg else COL["soft"]
        rounded(d, (x, 486, x + 74, 518), fill, radius=10)
        draw_text(d, (x + 37, 496), s, GF["tiny"], COL["white"] if i <= seg else COL["muted"], anchor="ma")
    cx = int(818 + 260 * ease(local))
    cy = int(448 + 38 * np.sin(local * np.pi))
    if seg in [0, 1, 2]:
        cursor(d, cx, cy, alpha=0.9)
    if seg == 3:
        mini_feedback(d, (702, 286, 1138, 668), ease(local))
    return img


def scene_close(p):
    img = base()
    d = ImageDraw.Draw(img, "RGBA")
    para(d, (58, 112), "One practice companion\nfor Bahasa Indo revision.", GF["hero"], COL["ink"], 760, gap=6)
    draw_text(d, (58, 250), "KataPult centralises relevant materials, then turns them into short practice flows.", GF["body"], COL["muted"])
    points = [
        ("Restart faster", "Know where to continue"),
        ("Practise weak areas", "Targeted drills and tests"),
        ("Understand answers", "Feedback with LLM-generated explanations"),
    ]
    for i, (h, b) in enumerate(points):
        reveal = ease_out(p * 1.6 - i * 0.16)
        if reveal <= 0:
            continue
        x = 72 + i * 380
        y = int(420 + (1 - reveal) * 26)
        rounded(d, (x, y, x + 326, y + 112), rgba(COL["white"], int(255 * reveal)), outline=rgba(COL["line"], int(255 * reveal)), radius=18)
        d.line((x + 22, y + 24, x + 22, y + 88), fill=rgba([COL["green"], COL["teal"], COL["amber"]][i], int(255 * reveal)), width=5)
        draw_text(d, (x + 48, y + 24), h, GF["h2"], rgba(COL["ink"], int(255 * reveal)))
        para(d, (x + 48, y + 58), b, GF["small"], rgba(COL["muted"], int(255 * reveal)), 230, gap=3)
    if p > 0.72:
        a = ease_out((p - 0.72) / 0.22)
        rounded(d, (216, 584, 1064, 642), rgba(COL["soft2"], int(255 * a)), outline=rgba(COL["line"], int(255 * a)), radius=16)
        draw_text(
            d,
            (640, 606),
            "Keep improving through user feedback, content review and small product refinements.",
            GF["small_b"],
            rgba(COL["ink"], int(255 * a)),
            anchor="ma",
        )
    return img


SCENES = [
    (0.0, 3.0, scene_problem),
    (3.0, 6.6, scene_grouping),
    (6.6, 13.2, scene_app_walkthrough),
    (13.2, 16.0, scene_close),
]


def render_at(t):
    for i, (start, end, painter) in enumerate(SCENES):
        if start <= t <= end or i == len(SCENES) - 1:
            p = clamp((t - start) / (end - start))
            frame = painter(p)
            trans = 0.22
            if i < len(SCENES) - 1 and end - t < trans:
                nxt = SCENES[i + 1][2](0)
                frame = Image.blend(frame, nxt, ease((trans - (end - t)) / trans))
            return frame.convert("RGB")
    return base().convert("RGB")


def create_contact_sheet(sample_paths):
    thumb_w, thumb_h = 320, 180
    pad = 18
    out = Image.new("RGB", (4 * thumb_w + 5 * pad, 2 * (thumb_h + 28) + 3 * pad), "white")
    d = ImageDraw.Draw(out)
    for i, p in enumerate(sample_paths):
        im = Image.open(p).convert("RGB")
        im.thumbnail((thumb_w, thumb_h))
        x = pad + (i % 4) * (thumb_w + pad)
        y = pad + (i // 4) * (thumb_h + 28 + pad)
        out.paste(im, (x, y))
        d.text((x, y + thumb_h + 6), p.name, fill=(80, 80, 80))
    out.save(CONTACT_PATH, quality=95)


def main():
    if OUT_DIR.exists():
        shutil.rmtree(OUT_DIR)
    FRAME_DIR.mkdir(parents=True, exist_ok=True)
    writer = None
    try:
        import imageio.v2 as imageio

        writer = imageio.get_writer(MP4_PATH, fps=FPS_MP4, codec="libx264", quality=8, macro_block_size=16)
    except Exception:
        writer = None
    gif_frames = []
    sample_paths = []
    total = int(DURATION * FPS_MP4)
    for i in range(total):
        frame = render_at(i / FPS_MP4)
        if writer:
            writer.append_data(np.asarray(frame))
        if i % (FPS_MP4 // FPS_GIF) == 0:
            frame_path = FRAME_DIR / f"{len(gif_frames) + 1:03d}.png"
            frame.save(frame_path, quality=95)
            gif_frames.append(frame)
            if len(gif_frames) in [1, 18, 38, 58, 78, 112, 144, 184]:
                sample_paths.append(frame_path)
    if writer:
        writer.close()
    pal = [f.convert("P", palette=Image.ADAPTIVE, colors=128) for f in gif_frames]
    pal[0].save(GIF_PATH, save_all=True, append_images=pal[1:], duration=int(1000 / FPS_GIF), loop=0, optimize=True, disposal=2)
    create_contact_sheet(sample_paths[:8])
    print(GIF_PATH)
    print(MP4_PATH if MP4_PATH.exists() else "")
    print(FRAME_DIR)
    print(CONTACT_PATH)
    print(f"gif_frames={len(gif_frames)} duration={DURATION}s size={GW}x{GH}")


if __name__ == "__main__":
    main()
