from pathlib import Path

from pptx.enum.text import PP_ALIGN

from create_editable_katapul_deck import Deck, PACKAGE, make_imbuhan_explanation_demo

OUT = PACKAGE / "KataPult_Improved_Editable_Product_Walkthrough_6slides.pptx"


def build():
    make_imbuhan_explanation_demo()
    d = Deck()

    # 1. Cover
    s = d.slide(1, "Practice Companion")
    d.title(
        s,
        "Working prototype",
        "KataPult: Bahasa Indo\nPractice Companion",
        "A working prototype for short, structured Bahasa Indo revision.",
        w=6.2,
    )
    d.browser(s, 6.58, 1.08, 6.04, 4.72, "01-home.png")
    d.shape(s, 0.64, 6.18, 11.94, 0.62)
    d.text(s, 0.96, 6.45, 10.8, 0.25, "Bahasa Indo learning materials centralised into one practice companion.", 13, "ink", True)

    # 2. Problem
    s = d.slide(2, "Problem")
    d.title(
        s,
        "Preparation reality",
        "The hard part was not finding\ncontent. It was gathering relevant\nmaterials for practice.",
        "Learners had notes, screenshots, online references and generated practice material, but no centralised place to learn in a bite-sized manner.",
        w=7.25,
        title_size=31,
    )
    for i, item in enumerate(["Study notes", "Screenshots", "Online references", "Generated practice material"]):
        d.text(s, 8.08, 2.08 + i * 0.24, 3.2, 0.18, "- " + item, 9.5, "muted")
    d.shape(s, 7.75, 1.46, 4.48, 1.42)
    d.text(s, 7.98, 1.74, 2.0, 0.26, "Scattered inputs", 13, "ink", True)
    d.arrow(s, 10.0, 3.05, 10.0, 3.72)
    d.shape(s, 7.75, 3.82, 4.48, 0.64, "soft2")
    d.text(s, 9.03, 4.1, 1.95, 0.2, '"Where do I start?"', 13, "ink", True, align=PP_ALIGN.CENTER)
    d.arrow(s, 10.0, 4.52, 10.0, 5.05)
    d.shape(s, 7.75, 5.15, 4.48, 0.64, "soft")
    d.text(s, 8.65, 5.42, 2.8, 0.2, "Too much setup before practice", 13, "ink", True, align=PP_ALIGN.CENTER)
    for i, (h, b) in enumerate([
        ("Weak areas were hard to isolate", "Imbuhan, persamaan and formal writing need repeated practice."),
        ("Progress was hard to see", "Attempts and mistakes were not easy to track."),
    ]):
        d.card(s, 0.64, 4.35 + i * 0.9, 5.7, 0.72, h, b)

    # 3. What changes
    s = d.slide(3, "What Changes")
    d.title(
        s,
        "What KataPult changes",
        "Scattered materials become\nshort practice flows.",
        "KataPult centralises relevant learning materials in one place, then routes them into drills, tests, answer feedback and writing-support pages.",
        w=7.2,
    )
    for i, item in enumerate(["Notes", "Online references", "Screenshots", "Recall packs", "Generated practice material"]):
        d.shape(s, 0.65, 3.45 + i * 0.42, 2.85, 0.32)
        d.text(s, 0.82, 3.56 + i * 0.42, 2.4, 0.12, item, 8.5, "ink", True)
    d.arrow(s, 3.65, 4.42, 4.55, 4.42)
    d.shape(s, 4.68, 3.95, 3.35, 1.1)
    d.text(s, 5.9, 4.2, 0.9, 0.24, "KataPult", 17, "green", True, align=PP_ALIGN.CENTER)
    d.text(s, 5.55, 4.54, 1.65, 0.2, "organises content", 12, "ink", True, align=PP_ALIGN.CENTER)
    d.arrow(s, 8.25, 4.42, 9.05, 4.42)
    for i, item in enumerate(["Daily challenge", "Component drills", "Custom tests", "Answer feedback and explanations", "Writing guides and examples"]):
        d.shape(s, 9.26, 3.45 + i * 0.42, 3.15, 0.32, "EEF6E8")
        d.text(s, 9.43, 3.56 + i * 0.42, 2.75, 0.12, item, 8.5, "ink", True)

    # 4. Product loop with large feedback proof
    s = d.slide(4, "Product Loop")
    d.title(
        s,
        "Practice loop",
        "A simple loop keeps\npractice accessible.",
        "Learners can pick a module, practise briefly, see right-or-wrong feedback with an AI-assisted explanation, then return through daily challenge, XP or streaks.",
        w=5.55,
    )
    d.browser(s, 5.62, 1.08, 6.95, 4.84, "09-imbuhan-explanation-demo.png")
    for i, (h, b, c) in enumerate([
        ("Pick module", "Start with a weak area.", "green"),
        ("Practise", "Answer a short prompt.", "teal"),
        ("Understand", "Feedback + AI explanation.", "amber"),
        ("Return later", "XP, streaks and review.", "green"),
    ]):
        d.card(s, 0.64 + i * 3.05, 5.74, 2.55, 0.86, h, b, c, 11.5, 8.5)

    # 5. Component summary
    s = d.slide(5, "Component Walkthrough")
    d.title(
        s,
        "Component summary",
        "Each component has a\nspecific learning job.",
        "The app separates browsing, typed practice, recall, writing guides and focused tests so learners do not revise from one giant list.",
        w=7.0,
    )
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
    d.shape(s, 0.64, 3.05, 11.8, 3.6)
    for i, (h, b) in enumerate(rows):
        y = 3.22 + i * 0.36
        d.text(s, 0.86, y, 2.05, 0.16, h, 8.6, "ink", True)
        d.text(s, 3.12, y, 8.8, 0.16, b, 8.4, "muted")
        if i:
            d.line(s, 0.83, y - 0.07, 12.2, y - 0.07, "line", 0.4)

    # 6. Current progress and future plans
    s = d.slide(6, "Current State")
    d.title(
        s,
        "Current progress & future plans",
        "Current state: trialling with users\nand collecting feedback",
        "The current numbers show content coverage and early informal use.",
        w=7.8,
    )
    d.metric(s, 0.64, 3.0, 3.25, 1.05, "10++", "early informal trial users", "Enough early use to keep improving.", "amber")
    d.metric(s, 4.16, 3.0, 3.25, 1.05, "1,554", "active drill-ready items", "Vocabulary, imbuhan and persamaan question pool.", "green")
    d.browser(s, 8.64, 1.55, 3.9, 2.9, "06-test-setup.png")
    for i, (h, b, c) in enumerate([
        ("Content quality", "Review collected items and generated explanations before treating them as validated material.", "green"),
        ("User feedback", "Collect what learners find useful, confusing or missing during real use.", "teal"),
        ("Iterative refinement", "Use feedback and usage patterns to improve the most-used modules first.", "amber"),
    ]):
        d.card(s, 0.64 + i * 4.05, 4.72, 3.54, 1.34, h, b, c, 13, 9.5)

    PACKAGE.mkdir(parents=True, exist_ok=True)
    d.prs.save(OUT)
    print(OUT)


if __name__ == "__main__":
    build()
