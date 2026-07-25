"use client";

export function DeleteLeadButton() {
  return (
    <button
      type="submit"
      className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
      onClick={(event) => {
        if (
          !confirm(
            "Diesen Lead unwiderruflich löschen? Das kann nicht rückgängig gemacht werden.",
          )
        ) {
          event.preventDefault();
        }
      }}
    >
      Lead jetzt löschen (DSGVO)
    </button>
  );
}
