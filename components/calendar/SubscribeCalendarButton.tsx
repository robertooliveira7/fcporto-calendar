
"use client";

import { useState } from "react";

export function SubscribeCalendarButton() {
  const [showAndroidInstructions, setShowAndroidInstructions] =
    useState(false);
  const [calendarUrl, setCalendarUrl] = useState("");
  const [copied, setCopied] = useState(false);

  function subscribe() {
    if (/Android/i.test(window.navigator.userAgent)) {
      setCalendarUrl(
        new URL("/api/calendar", window.location.origin).toString()
      );
      setCopied(false);
      setShowAndroidInstructions(true);
      return;
    }

    // Mantém o método atual para iOS e macOS.
    const calendarUrl =
      `webcal://${window.location.host}/api/calendar`;

    window.location.href = calendarUrl;
  }

  async function copyCalendarUrl() {
    try {
      await navigator.clipboard.writeText(calendarUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  function openGoogleCalendar() {
    window.open(
      "https://calendar.google.com/calendar/u/0/r/settings/addbyurl",
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={subscribe}
        className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
      >
        Subscrever calendário
      </button>

      {showAndroidInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="android-calendar-title"
            className="w-full max-w-lg rounded-xl bg-white p-6 text-gray-900 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <h2
                id="android-calendar-title"
                className="text-lg font-bold"
              >
                Subscrever no Android
              </h2>

              <button
                type="button"
                onClick={() => setShowAndroidInstructions(false)}
                aria-label="Fechar"
                className="rounded p-1 text-xl leading-none text-gray-500 hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Para adicionar o calendário ao Google Calendar,
              segue estes passos:
            </p>

            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6">
              <li>
                Copia o endereço do calendário abaixo.
              </li>
              <li>
                Abre o Google Calendar no navegador e ativa
                a opção «Site para computador» no menu do
                navegador.
              </li>
              <li>
                Em «Outros calendários», carrega em «+» e
                escolhe «A partir do URL». Cola o endereço e
                adiciona o calendário.
              </li>
            </ol>

            <div className="mt-4 flex gap-2">
              <input
                type="text"
                readOnly
                aria-label="Endereço do calendário"
                value={calendarUrl}
                onFocus={(event) => event.currentTarget.select()}
                className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-xs text-gray-700"
              />

              <button
                type="button"
                onClick={copyCalendarUrl}
                className="shrink-0 rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800"
              >
                {copied ? "Copiado!" : "Copiar"}
              </button>
            </div>

            <p className="mt-3 text-xs leading-5 text-gray-500">
              Depois de adicionares o calendário, poderá
              demorar algum tempo até os jogos aparecerem
                na aplicação Android.
            </p>

            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowAndroidInstructions(false)}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Fechar
              </button>

              <button
                type="button"
                onClick={openGoogleCalendar}
                className="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Abrir Google Calendar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
