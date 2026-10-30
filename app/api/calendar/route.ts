
import { COMPETITION_LABELS } from "@/constants/competitions";
import { getAllFixtures } from "@/services/matches";
import type { Match } from "@/types/match";

function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function formatIcsDate(date: string) {
  return new Date(date)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

function getMatchTitle(match: Match) {
  if (match.venue !== "away") {
    return `FC Porto vs ${match.opponent}`;
  }

  return `${match.opponent} vs FC Porto`;
}

function createEvent(match: Match) {
  if (!match.date) {
    return null;
  }

  const startDate = new Date(match.date);

  const endDate = new Date(
    startDate.getTime() + 2 * 60 * 60 * 1000
  );

  const competition =
    COMPETITION_LABELS[match.competition];

  const venueDescription =
    match.venue === "neutral"
      ? "Jogo em campo neutro"
      : match.venue === "home"
        ? "FC Porto joga em casa"
        : "FC Porto joga fora";

  const description = [
    competition,
    match.round,
    venueDescription,
  ].join(" · ");

  return [
    "BEGIN:VEVENT",
    `UID:${match.id}@fcporto-calendar`,
    `DTSTAMP:${formatIcsDate(new Date().toISOString())}`,
    `DTSTART:${formatIcsDate(match.date)}`,
    `DTEND:${formatIcsDate(endDate.toISOString())}`,
    `SUMMARY:${escapeIcsText(getMatchTitle(match))}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    match.stadium
      ? `LOCATION:${escapeIcsText(match.stadium)}`
      : null,
    "END:VEVENT",
  ]
    .filter(Boolean)
    .join("\r\n");
}

export async function GET() {
  const fixtures = await getAllFixtures();

  const events = fixtures
    .filter((match) => match.date !== null)
    .map(createEvent)
    .filter(Boolean);

  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Calendário FC Porto//2026-27//PT",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Calendário FC Porto 2026/27",
    "X-WR-CALDESC:Jogos do FC Porto na época 2026/27",
    "X-WR-TIMEZONE:Europe/Lisbon",
    "REFRESH-INTERVAL;VALUE=DURATION:PT1H",
    "X-PUBLISHED-TTL:PT1H",
    ...events,
    "END:VCALENDAR",
    "",
  ].join("\r\n");

  return new Response(calendar, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=300",
    },
  });
}
