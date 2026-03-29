'use client';

import Link from 'next/link';
import { useState } from 'react';

type Status = 'Programada' | 'Iniciada' | 'Não iniciada' | 'Concluída';

type MinhaOs = {
  os: string;
  descricao: string;
  equipe: string;
  data: string;
  status: Status;
  observacao: string;
};

export default function EncarregadoPage() {
  const [minhasOs, setMinhasOs] = useState<MinhaOs[]>([
    {
      os: 'OS-2026-001',
      descricao: 'Reparo de fissura em alvenaria',
      equipe: 'Equipe Civil A',
      data: '29/03/2026',
      status: 'Programada',
      observacao: '',
    },
    {
      os: 'OS-2026-003',
      descricao: 'Pintura de área técnica',
      equipe: 'Equipe Civil C',
      data: '29/03/2026',
      status: 'Concluída',
      observacao: '',
    },
    {
      os: 'OS-2026-004',
      descricao: 'Recomposição de calçada',
      equipe: 'Equipe Civil A',
      data: '29/03/2026',
      status: 'Não iniciada',
      observacao: '',
    },
  ]);

  const statusStyle: Record<Status, string> = {
    Programada: 'bg-slate-100 text-slate-700',
    Iniciada: 'bg-amber-100 text-amber-700',
    'Não iniciada': 'bg-red-100 text-red-700',
    Concluída: 'bg-emerald-100 text-emerald-700',
  };

  function atualizarStatus(os: string, novoStatus: Status) {
    setMinhasOs((listaAtual) =>
      listaAtual.map((item) =>
        item.os === os ? { ...item, status: novoStatus } : item
      )
    );
  }

  function atualizarObservacao(os: string, texto: string) {
    setMinhasOs((listaAtual) =>
      listaAtual.map((item) =>
        item.os === os ? { ...item, observacao: texto } : item
      )
    );
  }

  function StatusBadge({ status }: { status: Status }) {
    return (
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[status]}`}>
        {status}
      </span>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Portal de execução</p>
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Área do Encarregado
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Atualize o status das OS no fim do dia pelo celular ou computador.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
              >
                Voltar ao planejamento
              </Link>
              <Link
                href="/relatorios"
                className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
              >
                Relatórios
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Minhas programações</h2>
              <p className="text-sm text-slate-600">
                Atualize cada OS como iniciada, não iniciada ou concluída.
              </p>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
              Perfil: Encarregado
            </div>
          </div>

          <div className="space-y-4">
            {minhasOs.map((item) => (
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
                    <p className="text-xs text-slate-400">Equipe</p>
                    <p>{item.equipe}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Data</p>
                    <p>{item.data}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  <button
                    onClick={() => atualizarStatus(item.os, 'Iniciada')}
                    className="rounded-2xl border border-amber-300 bg-amber-50 px-3 py-3 text-sm font-semibold text-amber-700"
                  >
                    Marcar iniciada
                  </button>

                  <button
                    onClick={() => atualizarStatus(item.os, 'Não iniciada')}
                    className="rounded-2xl border border-red-300 bg-red-50 px-3 py-3 text-sm font-semibold text-red-700"
                  >
                    Marcar não iniciada
                  </button>

                  <button
                    onClick={() => atualizarStatus(item.os, 'Concluída')}
                    className="rounded-2xl border border-emerald-300 bg-emerald-50 px-3 py-3 text-sm font-semibold text-emerald-700"
                  >
                    Marcar concluída
                  </button>
                </div>

                <textarea
                  value={item.observacao}
                  onChange={(e) => atualizarObservacao(item.os, e.target.value)}
                  className="mt-4 min-h-[90px] w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none"
                  placeholder="Observação do encarregado"
                />

                <div className="mt-3 flex flex-wrap gap-3">
                  <button className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                    Anexar foto
                  </button>
                  <button
                    onClick={() => alert(`Atualização da ${item.os} salva apenas na tela por enquanto.`)}
                    className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
                  >
                    Salvar atualização
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}