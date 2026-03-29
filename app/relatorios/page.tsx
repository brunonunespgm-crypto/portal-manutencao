import Link from 'next/link';

export default function RelatoriosPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Indicadores</p>
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Relatórios e Indicadores
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Resumo por status, equipe, encarregado e período.
              </p>
            </div>

            <Link
              href="/"
              className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
            >
              Voltar ao início
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Execução do dia</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">74%</p>
            <p className="mt-1 text-sm text-slate-600">
              OS concluídas em relação às programadas.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Equipe com mais OS</p>
            <p className="mt-2 text-xl font-bold text-slate-900">Equipe Civil A</p>
            <p className="mt-1 text-sm text-slate-600">
              Maior volume de programação no período.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Principal pendência</p>
            <p className="mt-2 text-xl font-bold text-slate-900">OS não iniciadas</p>
            <p className="mt-1 text-sm text-slate-600">
              Monitorar causas e reprogramações.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Exportação</h2>
          <p className="mt-2 text-sm text-slate-600">
            Aqui você pode exportar os relatórios quando ligar o sistema ao banco.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
              Exportar Excel
            </button>
            <button className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
              Exportar PDF
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}