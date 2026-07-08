import type { NextRequest } from "next/server";

export const runtime = "nodejs";
// 항상 요청 시점에 실행 (정적 최적화 방지)
export const dynamic = "force-dynamic";

/** 클릭 신호로도 걸러지지 않은 명백한 봇/자동화 UA는 제외 */
const BOT_UA =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|pinterest|slackbot|telegrambot|whatsapp|discordbot|preview|headless|phantom|python-requests|curl|wget|axios|node-fetch|http-client/i;

function browserOf(ua: string): string {
  if (/edg/i.test(ua)) return "Edge";
  if (/samsungbrowser/i.test(ua)) return "Samsung Internet";
  if (/opr|opera/i.test(ua)) return "Opera";
  if (/chrome|crios/i.test(ua)) return "Chrome";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  if (/safari/i.test(ua)) return "Safari";
  return "Unknown";
}

function osOf(ua: string): string {
  if (/windows/i.test(ua)) return "Windows";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  if (/mac os x|macintosh/i.test(ua)) return "macOS";
  if (/android/i.test(ua)) return "Android";
  if (/linux/i.test(ua)) return "Linux";
  return "Unknown";
}

/** 2자리 국가코드 → 국기 이모지 */
function flagOf(cc: string): string {
  if (!/^[a-z]{2}$/i.test(cc)) return "";
  return String.fromCodePoint(
    ...[...cc.toUpperCase()].map((c) => 127397 + c.charCodeAt(0)),
  );
}

export async function POST(req: NextRequest) {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  // 웹훅 미설정이거나 봇이면 조용히 무시
  if (!webhook) return new Response(null, { status: 204 });

  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || BOT_UA.test(ua)) return new Response(null, { status: 204 });

  let body: { project?: string; action?: string; ref?: string; path?: string } =
    {};
  try {
    body = await req.json();
  } catch {
    return new Response(null, { status: 204 });
  }

  const project = (body.project ?? "알 수 없음").slice(0, 100);
  const action = (body.action ?? "클릭").slice(0, 60);

  // Vercel이 주입하는 대략적 위치 헤더
  const country = req.headers.get("x-vercel-ip-country") ?? "";
  const cityRaw = req.headers.get("x-vercel-ip-city") ?? "";
  const city = cityRaw ? decodeURIComponent(cityRaw) : "";
  const location =
    [flagOf(country), [city, country].filter(Boolean).join(", ")]
      .filter(Boolean)
      .join(" ") || "알 수 없음";

  // 최초 유입 출처: 내부 도메인이거나 비어있으면 직접 방문으로 간주
  let source = "직접 방문";
  const ref = body.ref ?? "";
  if (ref) {
    try {
      const host = new URL(ref).hostname;
      const selfHost = new URL(req.url).hostname;
      source = host === selfHost ? "직접 방문" : host;
    } catch {
      source = "직접 방문";
    }
  }

  const embed = {
    title: "🔎 포트폴리오 버튼 클릭",
    description: `**${project}** · ${action}`,
    color: 0x7c3aed,
    fields: [
      { name: "위치", value: location, inline: true },
      { name: "환경", value: `${browserOf(ua)} / ${osOf(ua)}`, inline: true },
      { name: "유입", value: source, inline: true },
      { name: "경로", value: body.path || "/", inline: false },
    ],
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });
  } catch {
    /* 웹훅 실패가 응답을 막지 않도록 무시 */
  }

  return new Response(null, { status: 204 });
}
