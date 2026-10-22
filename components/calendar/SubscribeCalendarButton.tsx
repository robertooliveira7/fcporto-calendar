"use client";

export function SubscribeCalendarButton() {
  function subscribe() {
    const calendarUrl =
      `webcal://${window.location.host}/api/calendar`;

    window.location.href = calendarUrl;
  }

  return (
    <button
      type="button"
      onClick={subscribe}
      className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
    >
      Subscrever calendário
    </button>
  );
}