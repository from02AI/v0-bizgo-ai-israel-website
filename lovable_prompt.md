Build a Hebrew-language website for BizgoAI Israel - a community platform helping Israeli small businesses adopt AI safely. The site includes a scrollable homepage, 3-tool interactive AI assessment simulator with calculations, consultation form page, about page, and privacy policy page.
CRITICAL: Full RTL (right-to-left) support required. Set html dir="rtl" and lang="he". All text alignment must be right-aligned. Match BizgoAI.com typography: use Inter as the primary font (same weights), and for Hebrew glyph coverage use a fallback font (Rubik) after Inter. Also load Caveat for any small handwritten accent labels (same as BizgoAI.com).
TECHNICAL STACK:
-
 React 18+ with React Router for navigation
-
 Tailwind CSS for all styling
-
 shadcn/ui (Radix-based) components for UI primitives (Button, Card, Input, Tabs/Accordion, Dialog, Toast)
-
 React Hook Form for forms
-
 Lucide React for icons
-
 React Context for state management between simulator tools
-
 No external form services - build forms natively
-
 No Supabase needed for MVP - client-side state only
DESIGN SYSTEM (match BizgoAI.com):
Colors (use Tailwind palette + a few exact hexes from BizgoAI.com):
-
 Primary (deep navy): #0b2e7b (used for key headings and icon gradients)
-
 Secondary (brand blue): blue-600 (#2563eb) for H2s, highlights, links
-
 Accent (CTA amber): amber-500 (#f59e0b) and amber-600 (#d97706) for gradients, focus rings
-
 Neutral text: slate-900 (main), slate-600 (body), slate-500 (muted)
-
 Backgrounds: white; slate-50; subtle blue wash (blue-50/30); occasional radial dot pattern at very low opacity
Typography:
-
 Primary font: Inter (400/500/600/700/800) exactly like BizgoAI.com; fallback to Rubik for Hebrew glyphs.
-
 Accent font: Caveat (500/700) for small handwritten-style tags only (if needed).
-
 H1: bold/black, large, tight tracking (similar to BizgoAI.com hero: text-5xl→text-6xl, font-black, tracking-tight)
-
 H2: text-blue-600, font-extrabold, drop-shadow-sm, responsive (text-3xl→text-5xl)
-
 Body: text-base→text-xl, text-slate-600, leading-relaxed
Spacing & Layout:
-
 Section padding: py-12 to py-20 (BizgoAI.com commonly uses py-12/16/20 depending on section)
-
 Containers: max-w-6xl or max-w-7xl centered with px-4/6/8
-
 Cards: rounded-2xl or rounded-3xl, subtle borders (blue-100/50 or slate-200), shadow-xl/2xl on feature cards
Component Patterns (BizgoAI.com patterns):
-
 Primary CTA buttons (hero + forms): bg-gradient-to-r from-amber-500 to-amber-600, text-white, font-bold, rounded-xl (or rounded-full in some CTAs), shadow-lg; hover adds stronger shadow (amber tint) and subtle transform
-
 Inputs/selects: border-2 border-slate-300, rounded-xl, focus:ring-2 focus:ring-amber-500, focus:border-amber-500
-
 Section “badge” labels: inline-flex, amber tint background (amber-500/10), border amber-300/40, rounded-full, small caps/semibold, amber text
-
 Icon tiles: gradient background from #0b2e7b to blue-600 with white icon, rounded-xl/2xl, shadow-lg
-
 Use lucide-react for all icons (to match the icon style used on BizgoAI.com)
SITE STRUCTURE:
/ (homepage - single scrollable page)
/simulator (3-tool assessment flow)
/about (full story page)
/consultation (consultation request form)
/privacy (privacy policy)
---

HOMEPAGE (/) - Single Scrollable Page with 8 Sections:
HEADER (sticky):
-
 Logo on right: "BizgoAI Israel" in text-2xl font-bold text-primary
-
 Desktop navigation (hidden on mobile): links to #how-it-works, #consultation, /about
-
 CTA button: "התחל סימולטור" linking to /simulator in accent color
-
 Mobile: hamburger menu icon (Menu from lucide-react)
SECTION 1 - HERO:
Background: gradient from neutral-50 to white
Content (centered, max-w-4xl):
Headline (H1): "עסקים קטנים מתקדמים עם AI. בביטחון."
Subheadline (text-xl): 
"מתחילים בכלי הערכה חינמי →
ממשיכים עם קהילה תומכת לעסקים קטנים →
צומחים עם כלים ופתרונות שנבנה ביחד"
Secondary hook (text-lg text-primary): "AI מבלבל? קבלו תשובות ישירות."
CTA button: "התחל סימולטור" (large, accent color) linking to /simulator
Below button, 3 checkmarks with text: "ללא עלות" "ללא התחייבות" "תוצאות כנות"
SECTION 2 - PROBLEM:
Background: white
Headline (H2, centered): "טובעים בכאוס של AI"
Description (text-xl, centered): "עסקים קטנים נמצאים בלחץ לאמץ AI בעוד שהטכנולוגיה רצה מהר יותר מהיכולת שלהם להדביק את הקצב."
STYLE REQUIREMENT (must match BizgoAI.com section "Drowning in AI Chaos"):
-
 Use the same visual hierarchy and spacing as BizgoAI.com #problem-section: pt-12 pb-4 on mobile, larger top padding on desktop.
-
 H2 color: text-blue-600; description color: text-[#0b2e7b] with drop-shadow-sm.
-
 3 pain-point cards: same card styling as BizgoAI.com pain-point-card (rounded, subtle shadow, icon in colored circle with white stroke, title in #0b2e7b, body in text-slate-600).
-
 Keep the Hebrew copy EXACTLY as written above; only translate the visual layout to RTL (right aligned text, mirrored directional cues if any).
3 cards in grid (md:grid-cols-3):
Card 1:
-
 Icon: Clock (w-8 h-8 in primary/10 circle background)
-
 Headline: "זמן"
-
 Text: "שוקעים בעבודה יומיומית — בלי רוחב פס לחקור פתרונות AI"
Card 2:
-
 Icon: DollarSign
-
 Headline: "תקציב"
-
 Text: "משאבים מוגבלים ופחד אמיתי לבזבז כסף ללא תמורה ברורה חסכון"
Card 3:
-
 Icon: Lightbulb
-
 Headline: "מומחיות"
-
 Text: "אין ידע טכני פנימי או צוות IT שיכול להעריך, ליישם ולתחזק כלים"
SECTION 3 - HOW IT WORKS:
Background: neutral-50
ID: "how-it-works" (for anchor link)
Headline (H2, centered): "איך זה עובד?"
Description: "3 כלים פשוטים, 5 דקות, תשובות כנות על AI לעסק שלך"
3 tool preview cards (md:grid-cols-3):
Tool 1:
-
 Icon: Target (primary color)
 Headline: "משימות"
 Headline: "בטיחות"
 Headline: "חסכון"
Tool 2:
-
 Icon: Shield (secondary color)
 Headline: "נקודת בדיקת בטיחות"
-
 Description: "האם העסק מוכן לאמץ AI? מאתרים סיכונים לפני שמתחילים"
-
 Stats: "4 שאלות | 2 דקות"
Tool 3:
-
 Icon: Calculator (accent color)
-
 Headline: "כמה אפשר לחסוך?"
-
 Description: "מחשבים חיסכון ל־6 חודשים כולל עלויות חבויות (עקומת למידה, טעויות, תחזוקה)"
-
 Stats: "6 שאלות | 3 דקות"
CTA button (centered): "להתחיל את הסימולטור עכשיו →" linking to /simulator
Below: 3 checkmarks "חינם לגמרי" "5 דקות" "תוצאות מיידיות"
SECTION 4 - CONSULTATION PREVIEW:
Background: white
ID: "consultation"
Headline (H2): "צריכים עזרה אישית? ייעוץ חינם."
Description: "לא בטוחים מאיפה להתחיל? נדבר על העסק שלכם. ייעוץ חינם של 30 דקות עם מומחה AI לעסקים קטנים."
What you'll get (3 bullets with checkmarks):
-
 "זיהוי הזדמנויות AI שמתאימות לעסק שלכם"
-
 "המלצות לכלים מותאמים אישית"
-
 "תוכנית התחלה ברורה"
How it works (numbered list):
1.
 "ממלאים טופס קצר (2 דקות)"
2.
 "אנחנו בוחרים עסקים מתאימים (פעם בשבוע)"
3.
 "מתאמים שיחה — ללא התחייבות"
Blue info box (bg-blue-50 border-blue-200):
"💡 שקיפות מלאה: הייעוץ הוא כלי שיווקי. אתם נותנים אימייל ומצטרפים לקהילה, ואנחנו בוחרים את העסקים שהכי מתאימים לצרכים שלנו."
"למה זה עדיין משתלם לכם:"
-
 "תקבלו המלצות AI אמיתיות ומותאמות"
-
 "תוכנית התחלה בלי התחייבות"
-
 "גישה לקהילה תומכת של בעלי עסקים קטנים"
CTA button: "הגישו בקשה לייעוץ חינם →" linking to /consultation
SECTION 5 - ABOUT PREVIEW:
Background: neutral-50
Headline (H2): "למה BizgoAI Israel?"
Preview text (max-w-3xl):
"אנחנו מאמינים שלעסקים קטנים בישראל מגיעה גישה הוגנת ל־AI. די לשיווק מנופח, די לכלים שלא עובדים, די לבזבוז זמן וכסף.
BizgoAI Israel נבנה על קהילה של בעלי עסקים קטנים שמשתפים ניסיון אמיתי, כדי שתוכלו לאמץ AI בביטחון — תוך חיסכון בזמן ובכסף."
3 key points with icons:
-
 🎯 "קהילה ישראלית: 100% תוכן בעברית, מותאם לעסקים בישראל"
-
 🤝 "בלי בולשיט: נתונים מגובים במחקר, לא שיווק מנופח"
-
 🚀 "מתחילים עכשיו, צומחים ביחד: כלים חינמיים היום, פתרונות שנבנה יחד מחר"
CTA link: "קראו את הסיפור המלא →" linking to /about
SECTION 6 - DATA PROOFS (Horizontal Scrollable):
Background: white
Headline (H2): "אתם לא לבד בזה"
Description: "מחקרי תעשייה מאשרים: פער האימוץ של AI בעסקים קטנים — אמיתי"
Horizontal scrollable container (overflow-x-auto) with 9 stat cards (w-80 each, flex-shrink-0):
Card 1: "71.9%" - "פער ידע" - "בעלי עסקים קטנים מציינים 'אני לא יודע מספיק על כלים דיגיטליים חדשים' כסיבה העיקרית לכך שלא הטמיעו AI." - Source: "Intuit & ICIC, מרץ 2025"
 Card 2: "36%" - "תקציבים עולים" - "תקציבי ה־AI החודשיים צפויים לעלות ב־36% ב־2025, אבל רק 39% מהארגונים יודעים להעריך חסכון בביטחון — פער נראות הולך וגדל." - Source: "CloudZero State of AI Costs, 2025"
Card 3: "37%" - "לחץ זמן" - "בעלי עסקים קטנים חסרי זמן/משאבים לבחון כלים לעומק — גם כשהם יודעים שזה יכול לעזור." - Source: "PayPal/Reimagine Main Street, 2025"
Card 4: "62%" - "חסם הבנה" - "חוסר הבנה של היתרונות וחוסר משאבים פנימיים (60%) הם החסמים המרכזיים בפני אימוץ AI." - Source: "Service Direct AI Report, 2025"
 Card 5: "34%" - "אין חסכון ברור" - "ללא שימושיות ברורה או החזר השקעה מורגש — עסקים מהססים להשקיע תקציב מוגבל." - Source: "PayPal/Reimagine Main Street, 2025"
Card 6: "28%" - "ירידת אימוץ" - "אימוץ AI בעסקים קטנים ירד מ־42% ב־2024 ל־28% בלבד ב־2025 — תסכול מהולך וגדל מהטמעה מורכבת." - Source: "Yahoo Finance/NEXT Survey, 2025"
Card 7 (quote card): Icon: graduation cap - Title: "פער ידע" - Quote: "רק שליש מהמשיבים מדווחים שהם מדרגים תוכניות AI בכל הארגון, וחברות גדולות נוטות יותר להגיע לשלב הזה." - Source: "McKinsey State of AI, 2025"
Card 8 (quote card): Icon: dollar sign - Title: "מגבלות תקציב" - Quote: "הפער בין מי שיכולים להרשות השקעה בטכנולוגיות לבין מי שלא — רק יגדל. כדי ש־AI יועיל לכלכלה, חייבים לוודא שעסקים קטנים לא נשארים מאחור." - Source: "Todd McCracken, President, NSBA"
Card 9 (quote card): Icon: clock - Title: "לחץ זמן" - Quote: "רוב בעלי העסקים הקטנים שאני מדבר איתם מרגישים מוצפים לגמרי כשזה מגיע ל־AI — יודעים שזה יכול לעזור, אבל לא יודעים מאיפה להתחיל או אילו כלים באמת פותרים את הבעיה שלהם." - Source: "BizTech Magazine, יוני 2025"
Scroll hint below cards: ChevronLeft icon + "גלול לעוד נתונים" + ChevronRight icon
SECTION 7 - COMMUNITY:
Background: purple-50
Headline (H2): "הצטרפו לקהילה"
Description: "לומדים מניסיון אמיתי של בעלי עסקים בישראל. משתפים, שואלים, צומחים יחד."
3 channel cards (md:grid-cols-3):
Card 1: WhatsApp
-
 Icon: MessageCircle in green-100 circle
-
 Headline: "קבוצת WhatsApp"
-
 Description: "דיונים יומיים, שאלות ותשובות, המלצות על כלים"
-
 CTA button: "הצטרפו ל־WhatsApp →" (green-600 background)
Card 2: Newsletter
-
 Icon: Mail in orange-100 circle
-
 Headline: "ניוזלטר שבועי"
-
 Description: "תובנות AI, מחקרים חדשים, ההמלצות המובילות"
-
 CTA button: "הירשמו לניוזלטר →" (accent background)
Card 3: Facebook
-
 Icon: Users in blue-100 circle
-
 Headline: "קבוצת Facebook"
-
 Description: "דיונים מעמיקים, שיתוף ניסיון, נטוורקינג"
-
 CTA button: "הצטרפו לפייסבוק →" (blue-600 background)
FOOTER:
Background: blue-900, text white
Grid layout (md:grid-cols-4):
Column 1: Logo + tagline
-
 "BizgoAI Israel" in text-2xl font-bold
-
 "עסקים קטנים מתקדמים עם AI. בביטחון." in text-sm text-blue-200
Column 2: Navigation
-
 Heading: "ניווט"
-
 Links: "דף הבית" "/" | "סימולטור" "/simulator" | "אודות" "/about" | "ייעוץ חינם" "/consultation"
Column 3: Community
-
 Heading: "קהילה"
-
 Links: "WhatsApp" "#" | "Facebook" "#" | "ניוזלטר" "#"
Column 4: Legal
-
 Heading: "משפטי"
-
 Link: "מדיניות פרטיות" "/privacy"
Bottom border-top section:
"© 2026 BizgoAI Israel. כל הזכויות שמורות" centered, text-sm
---

SIMULATOR PAGE (/simulator) - Interactive 3-Tool Assessment:
Use React Context to manage state flow between tools. Context should store: tool1Data, tool2Data, tool3Data, currentTool (1/2/3), currentQuestion.
LAYOUT:
-
 Sticky progress bar at top showing "כלי X מתוך 3" and tool name
-
 Progress bar visual (0-100% filled based on currentTool / 3 * 100)
-
 Main content area: max-w-3xl centered
-
 Back button available except on first question
-
 Clean white/neutral background
TOOL 1 - AI OPPORTUNITY FINDER (4 Questions):
Question 1:
Context text: "חשבו על משימה אחת חוזרת בעסק שלכם שגוזלת זמן משמעותי."
Question: "כמה פעמים אתם מבצעים את המשימה?"
4 large clickable cards (options):
-
 "פעם בשנה" (points: 0)
-
 "כמה פעמים בשנה" (points: 3)
-
 "פעם בחודש" (points: 7)
-
 "יותר מפעם בשבוע" (points: 10)
Question 2:
Context: "נשארים עם אותה משימה…"
Question: "עד כמה המשימה הזו חוזרת על עצמה?"
Options:
-
 "כל פעם שונה" (0)
-
 "יש דפוסים בסיסיים" (3)
-
 "תהליך די סטנדרטי" (7)
-
 "תהליך זהה בכל פעם" (10)
Question 3:
Context: "אותה משימה — נדבר על זמן."
Question: "כמה שעות בשבוע עובד אחד מקדיש למשימה?"
Options:
-
 "פחות משעה" (0)
-
 "1–5 שעות" (3)
-
 "6–15 שעות" (7)
-
 "יותר מ־15 שעות" (10)
Question 4:
Context: "שאלה אחרונה על המשימה הזו."
Question: "איזה סוג משימה זו?"
Options with emojis:
-
 "🎨 עבודה יצירתית לחלוטין" (0)
-
 "🎨📊 שילוב יצירתיות ונתונים" (3)
-
 "📊 ניתוח מסמכים/נתונים" (7)
-
 "🔄 משימות שגרתיות/אדמיניסטרטיביות" (10)
CALCULATION LOGIC FOR TOOL 1:
Score = (Q1_points × 0.35) + (Q2_points × 0.30) + (Q3_points × 0.15) + (Q4_points × 0.20)
Convert to 0-10 scale: (total_points / 40) × 10
Round to 1 decimal place
TOOL 1 RESULTS SCREEN:
Show large score number "/10" with colored emoji:
-
 8-10: 🟢 "הזדמנות מצוינת" (green)
-
 5-7.9: 🟡 "פוטנציאל בינוני" (yellow)
-
 0-4.9: 🔴 "לא מומלץ להתחיל כאן" (red)
Display interpretation with checkmark bullets:
-
 "תדירות גבוהה + חזרתיות = מועמד מצוין לאוטומציה"
-
 "השקעת זמן משמעותית = פוטנציאל חסכון משמעותי"
-
 "סוג המשימה מתאים לחוזקות של AI"
Blue box recommendation: "המשיכו לכלי 2 כדי לבדוק מוכנות ובטיחות לפני יישום."
Two buttons: "המשך לבדיקת בטיחות →" (primary) | "← התחלה מחדש" (secondary)
TOOL 2 - SAFETY CHECKPOINT (4 Questions):
Question 1:
Context: "כלי AI עובדים עם נתוני העסק. נבדוק את הגיבויים."
Question: "האם יש לכם גיבויים למידע חשוב?"
Options (each has risk value):
-
 "✅ כן, מערכת גיבוי אוטומטית" (risk: 0)
-
 "⚠️ כן, גיבויים ידניים מדי פעם" (risk: 5)
-
 "❌ אין גיבויים" (risk: 10)
Question 2:
Context: "AI עלול לטעות. האם תוכלו לגלות?"
Question: "האם תוכלו לזהות אם AI שוגה במשימה הזו?"
Options:
-
 "✅ כן, בקלות" (risk: 0)
-
 "⚠️ אולי, לפעמים" (risk: 5)
-
 "❌ לא, אין לי איך לדעת" (risk: 10)
Question 3:
Context: "מה ההשפעה אם AI טועה?"
Question: "מה קורה אם AI עושה טעות במשימה הזו?"
Options:
-
 "✅ תיקון פשוט בדקות" (risk: 0)
-
 "⚠️ שעות של תיקונים" (risk: 5)
-
 "❌ נזק כספי או משפטי" (risk: 10)
Question 4:
Context: "כלי AI דורשים זמן למידה. יש לכם קיבולת?"
Question: "יש לכם זמן ללמוד כלי חדש?"
Options:
-
 "✅ כן, יש לי/לנו זמן" (risk: 0)
-
 "⚠️ זמן מוגבל" (risk: 5)
-
 "❌ אין זמן בכלל" (risk: 10)
CALCULATION LOGIC FOR TOOL 2:
Risk Level = MAX(Q1_risk, Q2_risk, Q3_risk, Q4_risk)
If max_risk >= 8: RED (critical issues)
If max_risk >= 5 and < 8: YELLOW (prep needed)
If max_risk < 5: GREEN (ready to pilot)
TOOL 2 RESULTS SCREEN:
Show status with colored indicator and emoji:
GREEN 🟢: "סטטוס בטיחות: מוכן לפיילוט"
YELLOW 🟡: "סטטוס בטיחות: נדרשת היערכות"
RED 🔴: "סטטוס בטיחות: יש בעיות קריטיות"
Show risk breakdown with checkmarks/warnings for each question answer
For YELLOW:
List specific prep steps needed (2-3 items) with priority numbers
 Two CTA options: "המשך לחישוב חסכון →" (if they want to continue anyway) | "← חזרה למאתר הזדמנויות"
For GREEN:
Guardrails list (3-4 bullet points)
 Primary CTA: "המשך לחישוב חסכון →"
For RED:
Serious warning text explaining why unsafe
Two options: "התחל מחדש עם משימה אחרת" | "הגש בקשה לייעוץ מקצועי"
 TOOL 3 - חסכון CALCULATOR (6 Questions):
Question 1:
Question: "כמה שעות לוקחת המשימה לעובד אחד?"
Input: Number slider (0-40 hours)
Question 2:
Question: "כמה פעמים בחודש מבוצעת המשימה?"
Input: Number input with +/- buttons
Question 3:
Question: "שכר שעתי ממוצע של המבצע?"
Input: Number input (₪ per hour)
Question 4:
Question: "כמה זמן למידה יידרש לכלי?"
Options (radio buttons):
-
 "1–2 שעות"
-
 "3–5 שעות"
-
 "6–10 שעות"
-
 "יותר מ־10 שעות"
Question 5:
Question: "זמן תחזוקה חודשי (בדיקות/תיקונים/עדכונים)?"
Input: Number slider (0-20 hours)
Question 6:
Question: "עלות חודשית של הכלי (אם ידועה)?"
Input: Number input (₪/month) - optional
Help text: "לא בטוח? השאירו ריק — נבצע הערכה."
CALCULATION LOGIC FOR TOOL 3:
learningHoursMap = {"1-2": 1.5, "3-5": 4, "6-10": 8, "10+": 12}
monthlyTaskHours = hoursPerTask × timesPerMonth
monthlyLaborCost = monthlyTaskHours × hourlyRate
learningCost = learningHours × hourlyRate
maintenanceCost = maintenanceHours × hourlyRate
Month 1 (50% efficiency):
savings = (monthlyLaborCost × 0.5) - learningCost - maintenanceCost - toolCost
Month 2 (75% efficiency):
savings = (monthlyLaborCost × 0.75) - maintenanceCost - toolCost
Months 3-6 (100% efficiency):
savings = (monthlyLaborCost × 1.0) - maintenanceCost - toolCost
sixMonthTotal = month1 + month2 + (month3to6 × 4)
TOOL 3 RESULTS SCREEN:
Show large number: "תחזית חיסכון ל־6 חודשים: ₪X,XXX"
Table showing monthly breakdown:
Month | Labor Saved | Learning Cost | Maintenance | Tool Cost | Net Savings
1 | ₪X | -₪X | -₪X | -₪X | ₪X
2 | ₪X | ₪0 | -₪X | -₪X | ₪X
3-6 | ₪X/mo | ₪0 | -₪X | -₪X | ₪X/mo
Explanation text: "חישוב שמרני הכולל: חודש 1 עקומת למידה (50% יעילות), חודש 2 שיפור (75%), חודשים 3-6 יעילות מלאה (100%), ניכינו עלויות תחזוקה ועלות הכלי"
Optional: Simple line chart showing cumulative savings over 6 months
CTA to email capture screen
EMAIL CAPTURE SCREEN:
Headline: "רוצים את הפירוט המלא?"
Description: "נשלח לכם דוח שלם הכולל:"
Bullets:
-
 "ניתוח הזדמנות מלא עם המלצות לכלים"
-
 "צ'קליסט בטיחות מותאם למצב שלכם"
-
 "חישובי חסכון מפורטים עם כל ההנחות"
-
 "הצעדים הבאים ליישום"
Form:
-
 Email input (required)
-
 Checkbox: "הוסיפו אותי גם לקהילת ה־WhatsApp להמלצות כלים שוטפות"
-
 Submit button: "שלחו לי את הדוח המלא →"
-
 Privacy note below: "אנחנו מכבדים את הפרטיות שלכם. ניתן להסיר בכל עת."
-
 Skip link (small text): "דלג — אני מסתפק בתצוגה מקדימה"
SUCCESS SCREEN (after email submission):
Checkmark emoji + "הדוח נשלח! בדקו את תיבת המייל."
"הרגע שלחנו הערכת AI מלאה ל־[email]"
3 next steps cards:
1.
 "לקבוע ייעוץ חינם" - link to /consultation
2.
 "להצטרף לקהילה" - links to WhatsApp, Newsletter
3.
 "ללמוד עוד" - link to /about
---

ABOUT PAGE (/about):
Long-form reading layout (max-w-3xl, py-20)
Heading sections:
HERO:
H1: "לעסקים קטנים מגיעה גישה הוגנת ל־AI"
Subtitle: "BizgoAI Israel קיימת כדי להשוות את המגרש."
SECTION 1 - THE PROBLEM:
H2: "פער ה־AI רק גדל"
Body text (4-5 paragraphs):
"בישראל יש כ־560,000 עסקים קטנים ובינוניים. הם עמוד השדרה של הכלכלה.
אבל כשזה מגיע ל־AI, עסקים קטנים טובעים:
• 62% חסרים מומחיות להעריך כלים
• 74% מההטמעות שמתחילות מכלי — נכשלות
• 37% חסרי זמן לחקור פתרונות
 • 34% לא רואים חסכון ברור
בינתיים, ארגונים גדולים מדרגים AI בהצלחה. יש להם: צוותי IT ייעודיים, תקציבים לניסוי ולכישלון, זמן ומשאבים ליישום נכון, גישה ליועצים מומחים.
התוצאה? עסקים קטנים נשארים מאחור. כל יום."
SECTION 2 - WHY IT MATTERS:
H2: "זה לא רק טכנולוגיה"
Body text explaining consequences of SMBs not adopting AI, the widening gap, and cumulative effects
SECTION 3 - THE SOLUTION:
H2: "בוחרים דרך אחרת"
Description: "BizgoAI Israel היא לא עוד ספקית כלי AI. אנחנו פלטפורמה שמתחילה בקהילה — על ידי עסקים קטנים, בשביל עסקים קטנים."
3 subsections:
"1. מתחילים בהערכה (לא במכירה)"
"2. לומדים מעמיתים (לא מספקים)"
"3. בונים ביחד (לא מלמעלה)"
Each with 2-3 paragraphs of explanation
SECTION 4 - METHODOLOGY:
H2: "מגובה מחקר, מונע נתונים, נטול הטיות"
3 subsections:
"ראיות — לא דעות"
"שקיפות — לא אינטרסים חבויים"
"ולידציה קהילתית — לא הבטחות ספקים"
SECTION 5 - WHO WE ARE:
H2: "נבנה על ידי מי שמבין את השטח"
[Placeholder for founder story - include text: "סיפור המייסד יתווסף כאן"]
SECTION 6 - VISION:
H2: "לאן אנחנו הולכים"
3 phases:
"שלב 1: תשתית קהילה (עכשיו)"
"שלב 2: כלים מונעי־קהילה (6–12 חודשים)"
"שלב 3: צמיחת האקוסיסטם (12+ חודשים)"
FINAL CTA SECTION:
H2: "להיות חלק מהפתרון"
Text: "לעסקים קטנים בישראל מגיע יותר משיווק מנופח וכלים שלא עובדים. ביחד — בונים דרך טובה יותר."
3 CTA buttons: Simulator | Consultation | WhatsApp
---

CONSULTATION PAGE (/consultation):
Max-w-3xl centered layout
HERO:
H1: "ייעוץ AI אישי — 30 דקות, בחינם"
Subtitle: "לא בטוחים מאיפה להתחיל עם AI? נדבר על האתגרים הספציפיים של העסק שלכם."
TRANSPARENCY BOX (blue-50 background, blue-200 border, prominent):
Icon: Info
Heading: "שקיפות מלאה: הייעוץ הוא כלי שיווקי"
Text: "אתם ממלאים טופס ומצטרפים לקהילה. אנחנו בוחרים עסקים מתאימים פעם בשבוע ופונים לתאם שיחה."
White sub-box: "למה זה עדיין משתלם לכם:"
Bullets: "אסטרטגיית AI מותאמת לעסק" | "המלצות לכלים ספציפיות" | "תוכנית פעולה ברורה" | "גישה לקהילה תומכת"
FORM (use React Hook Form):
Section 1 header: "על העסק שלכם"
Fields:
1.
 שם מלא 
*
 (text input, required)
2. כתובת אימייל 
*
 (email input, required, help: "נשלח אישור ופרטי הייעוץ")
3.
 מספר טלפון (tel input, optional, help: "מעדיפים תיאום ב־WhatsApp")
4.
 שם העסק 
*
 (text input, required)
5. ענף/סקטור 
*
 (dropdown: מסעדות ומזון | קמעונאות | שירותים מקצועיים | בנייה | בריאות | ייצור | טכנולוגיה | אחר)
6.
 גודל העסק * (dropdown: 1–5 עובדים | 6–10 | 11–25 | 26–50 | 50+)
Section 2 header: "אתגרי ה־AI שלכם"
Fields:
7.
 מה האתגר הגדול ביותר שלכם עם AI? * (checkboxes, multiple selection):
-
 לא יודעים מאיפה להתחיל
-
 לא בטוחים אילו כלים מתאימים
-
 מגבלות תקציב
-
 אין זמן לחקר
-
 חוסר ידע טכני
-
 פחד מבזבוז כסף
-
 אחר: [text input]
8.
 האם השתמשתם בכלי AI בעבר? * (radio buttons):
-
 לא, אף פעם
-
 כן, ולא עבד טוב
-
 כן, משתמשים בכלי בסיס (כמו ChatGPT)
-
 כן, משתמשים בכלים מתקדמים באופן קבוע
9.
 מה המטרה העיקרית שלכם מהייעוץ? * (textarea, required, help: "היו ספציפיים — זה עוזר לנו להתכונן ולבחור", example: "אני רוצה לאוטומט מעקבי לקוחות, לא בטוח באיזה כלי להשתמש ומה העלות")
Section 3 header: "תיאום"
Fields:
10.
 מתי נוח לשיחה? * (checkboxes, multiple):
-
 בוקר (9:00–12:00)
-
 צהריים (12:00–15:00)
-
 אחר הצהריים (15:00–18:00)
-
 גמיש — כל שעה
11.
 להצטרף לקהילת WhatsApp? * (radio):
-
 כן, הוסיפו אותי לקבוצה
-
 לא, רק ייעוץ
Submit button: "שליחת בקשה →"
SUCCESS SCREEN (after submission):
Checkmark + "הבקשה התקבלה!"
Timeline:
"1. נבדוק את כל הבקשות השבוע"
"2. אם נבחרתם — נשלח מייל לתיאום תוך 3–5 ימים"
"3. נקבע שיחת ייעוץ (30 דקות, ללא עלות)"
What to expect section (3-4 bullets)
Meanwhile section with links:
-
 Try simulator
-
 Join WhatsApp
-
 Read about us
Contact email for questions
---

PRIVACY PAGE (/privacy):
Simple layout, max-w-3xl, text-lg, leading-relaxed
H1: "מדיניות פרטיות"
Standard privacy policy sections covering:
-
 What data is collected (email, name, business info, assessment results)
-
 How it's used (community building, consultation scheduling, newsletters)
-
 Data storage (mention that in MVP it's client-side only)
-
 User rights (unsubscribe, data deletion requests)
-
 Cookie policy if applicable
-
 Contact information for privacy questions
Length: 800-1200 words in Hebrew
Tone: Clear, legal but readable
---

IMPLEMENTATION NOTES:
State Management:
-
 Use React Context for simulator data flow between tools
-
 Store: tool1Data, tool2Data, tool3Data, currentTool, currentQuestion
-
 Data persists within session only (no backend for MVP)
Form Handling:
-
 Use React Hook Form for all forms
-
 Client-side validation only
-
 Console.log submissions (no real backend integration)
-
 Show success screens after submission
Routing:
-
 React Router with routes: /, /simulator, /about, /consultation, /privacy
-
 Smooth scroll behavior for homepage anchor links (#how-it-works, #consultation)
Responsive Design:
-
 Mobile-first approach
-
 Hamburger menu on mobile for header navigation
-
 Stack cards vertically on mobile
-
 Horizontal scroll for data proof section works on mobile touch
Icons:
-
 Use lucide-react library
-
 Common icons needed: Menu, Check, Clock, DollarSign, Lightbulb, Target, Shield, Calculator, MessageCircle, Mail, Users, ChevronLeft, ChevronRight, Info, ArrowRight
Animations:
-
 Smooth transitions on button hovers
-
 Card hover shadow effects
-
 Progress bar animation when changing tools
-
 Keep subtle - don't overdo
Typography:
-
 Load Inter (and Caveat) from Google Fonts like BizgoAI.com. Configure font-sans to prefer Inter, with Rubik as fallback for Hebrew glyphs.
Critical RTL Requirements:
-
 Set dir="rtl" on html element
-
 All text must align right by default
-
 Form labels align right
-
 Icons that suggest direction (arrows, chevrons) must be mirrored logically
-
 Test thoroughly that layout doesn't break
Quality Standards:
-
 All Hebrew text must be copied exactly from this prompt
-
 No placeholder text like "Lorem ipsum"
-
 All numbers, stats, and calculations must work correctly
-
 Forms should have proper validation
-
 Mobile experience must be smooth
-
 No console errors
Build the complete website with all pages and features described above. Ensure full RTL support, proper Hebrew typography, all interactive calculations working correctly, and responsive design on all screen sizes.
