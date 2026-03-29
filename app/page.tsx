'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type Status = 'Programada' | 'Iniciada' | 'Não iniciada' | 'Concluída';

type Programacao = {
  numeroChamado: string;
  descricao: string;
  areaRequisitante: string;
  localRealizacao: string;
  tempoExec: string;
  dataInicio: string;
  dataTermino: string;
  tipoSolicitacao: string;
  equipe: string;
  encarregado: string;
  solicitante: string;
  status: Status;
};

export default function HomePage() {
  const dadosExemplo: Programacao[] = [
    {
      numeroChamado: 'CH-2026-001',
      descricao: 'Reparo de fissura em alvenaria',
      areaRequisitante: 'Manutenção Predial',
      localRealizacao: 'Bloco A',
      tempoExec: '4h',
      dataInicio: '29/03/2026',
      dataTermino: '29/03/2026',
      tipoSolicitacao: 'Corretiva',
      equipe: 'Equipe Civil A',
      encarregado: 'João Souza',
      solicitante: 'Carlos Lima',
      status: 'Programada',
    },
    {
      numeroChamado: 'CH-2026-002',
      descricao: 'Recuperação de piso industrial',
      areaRequisitante: 'Produção',
      localRealizacao: 'Galpão 2',
      tempoExec: '8h',
      dataInicio: '29/03/2026',
      dataTermino: '30/03/2026',
      tipoSolicitacao: 'Programada',
      equipe: 'Equipe Civil B',
      encarregado: 'Marcos Silva',
      solicitante: 'Fernanda Alves',
      status: 'Iniciada',
    },
    {
      numeroChamado: 'CH-2026-003',
      descricao: 'Pintura de área técnica',
      areaRequisitante: 'Utilidades',
      localRealizacao: 'Casa de Bombas',
      tempoExec: '6h',
      dataInicio: '29/03/2026',
      dataTermino: '29/03/2026',
      tipoSolicitacao: 'Melhoria',
      equipe: 'Equipe Civil C',
      encarregado: 'João Souza',
      solicitante: 'Ana Costa',
      status: 'Concluída',
    },
    {
      numeroChamado: 'CH-2026-004',
      descricao: 'Recomposição de calçada',
      areaRequisitante: 'Infraestrutura',
      localRealizacao: 'Portaria 1',
      tempoExec: '5h',
      dataInicio: '29/03/2026',
      dataTermino: '29/03/2026',
      tipoSolicitacao: 'Programada',
      equipe: 'Equipe Civil A',
      encarregado: 'João Souza',
      solicitante: 'Rafael Nunes',
      status: 'Não iniciada',
    },
  ];

  const [programacoes, setProgramacoes] = useState<Programacao[]>(dadosExemplo);
  const [filtroNumero, setFiltroNumero] = useState('');
  const [filtroEquipe, setFiltroEquipe] = useState('');
  const [filtroData, setFiltroData] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroEncarregado, setFiltroEncarregado] = useState('');
  const [filtroTipoSolicitacao, setFiltroTipoSolicitacao] = useState('');

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('programacoesImportadas');

    if (dadosSalvos) {
      try {
        const dadosConvertidos = JSON.parse(dadosSalvos) as Programacao[];
        if (Array.isArray(dadosConvertidos) && dadosConvertidos.length > 0) {
          setProgramacoes(dadosConvertidos);
        }
      } catch {
        console.error('Erro ao ler programações importadas.');
      }
    }
  }, []);

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

  const encarregadosUnicos = useMemo(() => {
    return [...new Set(programacoes.map((item) => item.encarregado).filter(Boolean))].sort();
  }, [programacoes]);

  const tiposSolicitacaoUnicos = useMemo(() => {
    return [...new Set(programacoes.map((item) => item.tipoSolicitacao).filter(Boolean))].sort();
  }, [programacoes]);

  const programacoesFiltradas = useMemo(() => {
    return programacoes.filter((item) => {
      const atendeNumero =
        filtroNumero === '' ||
        item.numeroChamado.toLowerCase().includes(filtroNumero.toLowerCase());

      const atendeEquipe =
        filtroEquipe === '' ||
        item.equipe.toLowerCase().includes(filtroEquipe.toLowerCase());

      const atendeData =
        filtroData === '' ||
        item.dataInicio.toLowerCase().includes(filtroData.toLowerCase());

      const atendeStatus =
        filtroStatus === '' || item.status === filtroStatus;

      const atendeEncarregado =
        filtroEncarregado === '' || item.encarregado === filtroEncarregado;

      const atendeTipoSolicitacao =
        filtroTipoSolicitacao === '' || item.tipoSolicitacao === filtroTipoSolicitacao;

      return (
        atendeNumero &&
        atendeEquipe &&
        atendeData &&
        atendeStatus &&
        atendeEncarregado &&
        atendeTipoSolicitacao
      );
    });
  }, [
    programacoes,
    filtroNumero,
    filtroEquipe,
    filtroData,
    filtroStatus,
    filtroEncarregado,
    filtroTipoSolicitacao,
  ]);

  const cards = useMemo(() => {
    const totalProgramadas = programacoes.filter((item) => item.status === 'Programada').length;
    const totalIniciadas = programacoes.filter((item) => item.status === 'Iniciada').length;
    const totalNaoIniciadas = programacoes.filter((item) => item.status === 'Não iniciada').length;
    const totalConcluidas = programacoes.filter((item) => item.status === 'Concluída').length;

    return [
      { label: 'OS Programadas', value: totalProgramadas },
      { label: 'Iniciadas', value: totalIniciadas },
      { label: 'Não iniciadas', value: totalNaoIniciadas },
      { label: 'Concluídas', value: totalConcluidas },
    ];
  }, [programacoes]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <style>{`
  .tabela-sem-barra::-webkit-scrollbar {
    height: 0px;
    display: none;
  }

  .tabela-sem-barra {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
`}</style>

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
                Visão geral das programações com indicadores e ações principais.
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

          <div className="mt-6 grid gap-3 md:grid-cols-6">
            <input
              value={filtroNumero}
              onChange={(e) => setFiltroNumero(e.target.value)}
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none"
              placeholder="Filtrar por número do chamado"
            />

            <input
              value={filtroEquipe}
              onChange={(e) => setFiltroEquipe(e.target.value)}
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none"
              placeholder="Filtrar por equipe"
            />

            <input
              value={filtroData}
              onChange={(e) => setFiltroData(e.target.value)}
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none"
              placeholder="Filtrar por data início"
            />

            <select
              value={filtroEncarregado}
              onChange={(e) => setFiltroEncarregado(e.target.value)}
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-600 outline-none"
            >
              <option value="">Encarregado</option>
              {encarregadosUnicos.map((encarregado) => (
                <option key={encarregado} value={encarregado}>
                  {encarregado}
                </option>
              ))}
            </select>

            <select
              value={filtroTipoSolicitacao}
              onChange={(e) => setFiltroTipoSolicitacao(e.target.value)}
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-600 outline-none"
            >
              <option value="">Tipo da solicitação</option>
              {tiposSolicitacaoUnicos.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>

            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-600 outline-none"
            >
              <option value="">Status</option>
              <option value="Programada">Programada</option>
              <option value="Iniciada">Iniciada</option>
              <option value="Não iniciada">Não iniciada</option>
              <option value="Concluída">Concluída</option>
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
                Tabela para acompanhamento de todas as ordens de serviço importadas da planilha.
              </p>
            </div>
          </div>

          <div className="tabela-sem-barra overflow-x-auto">
            <table className="min-w-[1600px] border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-sm text-slate-500">
                  <th className="px-4 py-2">Número do chamado</th>
                  <th className="px-4 py-2">Descrição</th>
                  <th className="px-4 py-2">Área requisitante</th>
                  <th className="px-4 py-2">Local de realização</th>
                  <th className="px-4 py-2">Tempo exec</th>
                  <th className="px-4 py-2">Data início</th>
                  <th className="px-4 py-2">Data término</th>
                  <th className="px-4 py-2">Tipo da solicitação</th>
                  <th className="px-4 py-2">Equipe</th>
                  <th className="px-4 py-2">Encarregado</th>
                  <th className="px-4 py-2">Solicitante</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Ação</th>
                </tr>
              </thead>

              <tbody>
                {programacoesFiltradas.map((item) => (
                  <tr key={item.numeroChamado} className="rounded-2xl bg-slate-50 text-sm text-slate-700">
                    <td className="rounded-l-2xl px-4 py-4 font-semibold text-slate-900 whitespace-nowrap">
                      {item.numeroChamado}
                    </td>

                    <td className="px-4 py-4 text-justify min-w-[220px]">
                      {item.descricao}
                    </td>

                    <td className="px-4 py-4">{item.areaRequisitante}</td>
                    <td className="px-4 py-4">{item.localRealizacao}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{item.tempoExec}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{item.dataInicio}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{item.dataTermino}</td>
                    <td className="px-4 py-4">{item.tipoSolicitacao}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{item.equipe}</td>
                    <td className="px-4 py-4">{item.encarregado}</td>
                    <td className="px-4 py-4">{item.solicitante}</td>

                    <td className="px-4 py-4">
                      <StatusBadge status={item.status} />
                    </td>

                    <td className="rounded-r-2xl px-4 py-4">
                      <button className="rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold whitespace-nowrap">
                        Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}