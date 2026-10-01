import type { Match, MatchStatus } from "@/types/match";

const LIGA_PORTUGAL_BASE_URL = "https://www.ligaportugal.pt";

export type TacaLigaMatchData = {
  homeTeam: string;
  awayTeam: string;
  dateLabel: string;
  time: string;
  homeCrest: string | null;
  awayCrest: string | null;
  homeScore: number | null;
  awayScore: number | null;
  status: MatchStatus;
};

async function getLigaPortugalMatchPage(
  path: string
): Promise<string> {
  const response = await fetch(
    `${LIGA_PORTUGAL_BASE_URL}${path}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Erro ao obter jogo da Liga Portugal: ${response.status}`
    );
  }

  return response.text();
}

export async function getTacaLigaMatchPage(): Promise<string> {
  return getLigaPortugalMatchPage(
    "/match/20262027/allianzcup/1/1"
  );
}

export async function getHistoricalTacaLigaMatchPage(): Promise<string> {
  return getLigaPortugalMatchPage(
    "/match/20252026/allianzcup/1/2"
  );
}

export function parseTacaLigaMatchPage(
  html: string
): TacaLigaMatchData {
  const homeSection = html.match(
    /match_header_info_club match_header_info_home([\s\S]*?)match_header_info_result/
  );

  const awaySection = html.match(
    /match_header_info_club match_header_info_away([\s\S]*?)(?:match_header|<\/main>|<\/section>)/
  );

  const homeTeam = homeSection?.[1].match(
    /class="club_name_label"[^>]*>([^<]+)<\/a>/
  )?.[1];

  const awayTeam = awaySection?.[1].match(
    /class="club_name_label"[^>]*>([^<]+)<\/a>/
  )?.[1];

  const homeCrest = homeSection?.[1].match(
    /<img[^>]+src="([^"]+)"[^>]+alt="[^"]+"/
  )?.[1];

  const awayCrest = awaySection?.[1].match(
    /<img[^>]+src="([^"]+)"[^>]+alt="[^"]+"/
  )?.[1];

  const dateLabel = html.match(
    /class="container-date"[\s\S]*?<span>([^<]+)<\/span>/
  )?.[1];

  const scoreSection = html.match(
    /class="match-item-row-score[^"]*"[\s\S]*?<\/div>/
  )?.[0];

  const time = html.match(
    /class="match-item-row-score no_info"[\s\S]*?<div>([^<]+)<\/div>/
  )?.[1];

  let homeScore: number | null = null;
  let awayScore: number | null = null;
  let status: MatchStatus = "scheduled";

  if (scoreSection) {
    const scoreMatch = scoreSection.match(
      /(\d+)\s*[-–]\s*(\d+)/
    );

    if (scoreMatch) {
      homeScore = Number(scoreMatch[1]);
      awayScore = Number(scoreMatch[2]);
      status = "finished";
    }
  }

  if (!homeTeam || !awayTeam || !dateLabel) {
    throw new Error(
      "Não foi possível extrair os dados do jogo da Taça da Liga."
    );
  }

  return {
    homeTeam: homeTeam.trim(),
    awayTeam: awayTeam.trim(),
    dateLabel: dateLabel.trim(),
    time: time?.trim() ?? "",
    homeCrest: homeCrest ?? null,
    awayCrest: awayCrest ?? null,
    homeScore,
    awayScore,
    status,
  };
}

function buildTacaLigaDate(
  dateLabel: string,
  time: string
): string | null {
  const monthMap: Record<string, string> = {
    jan: "01",
    fev: "02",
    mar: "03",
    abr: "04",
    mai: "05",
    jun: "06",
    jul: "07",
    ago: "08",
    set: "09",
    out: "10",
    nov: "11",
    dez: "12",
  };

  const dateMatch = dateLabel.match(
    /(\d{1,2})\s+([a-zç]+)/i
  );

  const timeMatch = time.match(
    /(\d{1,2})h(\d{2})/
  );

  if (!dateMatch || !timeMatch) {
    return null;
  }

  const day = dateMatch[1].padStart(2, "0");
  const month = monthMap[dateMatch[2].toLowerCase()];

  if (!month) {
    return null;
  }

  const hour = timeMatch[1].padStart(2, "0");
  const minute = timeMatch[2];

  return `2026-${month}-${day}T${hour}:${minute}:00+00:00`;
}

export async function getTacaLigaMatch(): Promise<Match> {
  const html = await getTacaLigaMatchPage();
  const data = parseTacaLigaMatchPage(html);

  const fcPortoIsHome = data.homeTeam === "FC Porto";

  const opponent = fcPortoIsHome
    ? data.awayTeam
    : data.homeTeam;

  const hasScore =
    data.homeScore !== null &&
    data.awayScore !== null;

  return {
    id: "taca-liga-2026-27-quartos",
    opponent,
    competition: "taca-liga",
    round: "Quartos de final",

    date: buildTacaLigaDate(
      data.dateLabel,
      data.time
    ),

    stadium: fcPortoIsHome
      ? "Estádio do Dragão"
      : "",

    venue: fcPortoIsHome
      ? "home"
      : "away",

    status: data.status,

    score: hasScore
      ? {
          fcPorto: fcPortoIsHome
            ? data.homeScore!
            : data.awayScore!,

          opponent: fcPortoIsHome
            ? data.awayScore!
            : data.homeScore!,
        }
      : null,

    goals: [],

    fcPortoCrest: fcPortoIsHome
      ? data.homeCrest ?? undefined
      : data.awayCrest ?? undefined,

    opponentCrest: fcPortoIsHome
      ? data.awayCrest ?? undefined
      : data.homeCrest ?? undefined,
  };
}