import Link from 'next/link';

type Status = 'Programada' | 'Iniciada' | 'Não iniciada' | 'Concluída';

type Programacao = {
  os: string;
  descricao: string;
  abriu: string;
  equipe: string;
  encarregado: string;
  data: string;
  status: Status;
};

export default function HomePage() {
  const cards = [
    { label: 'OS Programadas', value: 28 },
    { label: 'Iniciadas', value: 9 },
    { label: 'Não iniciadas', value: 6 },
    { label: 'Concluídas', value: 13 },
  ];

  const programacoes: Programacao[] = [
    {
      os: 'OS-2026-001',
      descricao: 'Reparo de fissura em alvenaria',
      abriu: 'Carlos Lima',
      equipe: 'Equipe Civil A',
      encarregado: 'João Souza',
      data: '29/03/2026',
      status: 'Programada',
    },
    {
      os: 'OS-2026-002',
      descricao: 'Recuperação de piso industrial',
      abriu: 'Fernanda Alves',
      equipe: 'Equipe Civil B',
      encarregado: 'Marcos Silva',
      data: '29/03/2026',
      status: 'Iniciada',
    },
    {
      os: 'OS-2026-003',
      descricao: 'Pintura de área técnica',
      abriu: 'Ana Costa',
      equipe: 'Equipe Civil C',
      encarregado: 'João Souza',
      data: '29/03/2026',
      status: 'Concluída',
    },
    {
      os: 'OS-2026-004',
      descricao: 'Recomposição de calçada',
      abriu: 'Rafael Nunes',
      equipe: 'Equipe Civil A',
      encarregado: 'João Souza',
      data: '29/03/2026',
      status: 'Não iniciada',
    },
  ];

  const statusStyle: Record<Status, string> = {
    Programada: 'bg-slate-100 text-slate-700',
    Iniciada: 'bg-amber-100 text-amber-700',
    'Não iniciada': 'bg-red-100 text-red-700',
    Concluída: 'bg-emerald-100 text-emerald-700',
  };

  function StatusBadge({ status }: { status: Status }) {
    return (
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[status]}`}>
        {status}
      </span>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Protótipo do portal</p>
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Programação de Manutenção Civil
              </h1>
              <p className="mt-2 text-sm text-slate-600 md:text-base">
                Portal com perfil de Planejamento e perfil de Encarregado, preparado para celular e computador.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/upload"
                className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm"
              >
                Upload da programação
              </Link>

              <Link
                href="/relatorios"
                className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
              >
                Relatórios
              </Link>

              <Link
                href="/encarregado"
                className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
              >
                Área do encarregado
              </Link>
            </div>
          </div>
        </header>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Tela 1 — Dashboard do Planejamento
              </h2>
              <p className="text-sm text-slate-600">
                Visão geral das OS com indicadores e ações principais.
              </p>
            </div>
            <div className="rounded-2xl bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              Perfil: Planejamento
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {cards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-slate-200 p-5">
                <p className="text-sm text-slate-500">{card.label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-5">
            <input
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none"
              placeholder="Filtrar por número da OS"
            />
            <input
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none"
              placeholder="Filtrar por encarregado"
            />
            <input
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none"
              placeholder="Filtrar por equipe"
            />
            <input
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none"
              placeholder="Filtrar por data"
            />
            <select className="rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-600 outline-none">
              <option>Status</option>
              <option>Programada</option>
              <option>Iniciada</option>
              <option>Não iniciada</option>
              <option>Concluída</option>
            </select>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Tela 2 — Lista de Programações
              </h2>
              <p className="text-sm text-slate-600">
                Tabela para acompanhamento de todas as ordens de serviço.
              </p>
            </div>
          </div>

          <div className="hidden overflow-x-auto lg:block">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-sm text-slate-500">
                  <th className="px-4 py-2">OS</th>
                  <th className="px-4 py-2">Descrição</th>
                  <th className="px-4 py-2">Quem abriu</th>
                  <th className="px-4 py-2">Equipe</th>
                  <th className="px-4 py-2">Encarregado</th>
                  <th className="px-4 py-2">Data</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Ação</th>
                </tr>
              </thead>
              <tbody>
                {programacoes.map((item) => (
                  <tr key={item.os} className="rounded-2xl bg-slate-50 text-sm text-slate-700">
                    <td className="rounded-l-2xl px-4 py-4 font-semibold text-slate-900">
                      {item.os}
                    </td>
                    <td className="px-4 py-4">{item.descricao}</td>
                    <td className="px-4 py-4">{item.abriu}</td>
                    <td className="px-4 py-4">{item.equipe}</td>
                    <td className="px-4 py-4">{item.encarregado}</td>
                    <td className="px-4 py-4">{item.data}</td>
                    <td className="px-4 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="rounded-r-2xl px-4 py-4">
                      <button className="rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold">
                        Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 lg:hidden">
            {programacoes.map((item) => (
              <div key={item.os} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.os}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.descricao}</p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
                  <div>
                    <p className="text-xs text-slate-400">Quem abriu</p>
                    <p>{item.abriu}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Equipe</p>
                    <p>{item.equipe}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Encarregado</p>
                    <p>{item.encarregado}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Data</p>
                    <p>{item.data}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}