'use client';

import Link from 'next/link';
import { useState } from 'react';
import * as XLSX from 'xlsx';

type Status = 'Programada' | 'Iniciada' | 'Não iniciada' | 'Concluída';

type ProgramacaoImportada = {
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

type LinhaPlanilha = Record<string, string | number | boolean | null | undefined>;

export default function UploadPage() {
  const [nomeArquivo, setNomeArquivo] = useState('');
  const [dadosImportados, setDadosImportados] = useState<ProgramacaoImportada[]>([]);
  const [erro, setErro] = useState('');

  function valorTexto(valor: unknown) {
    if (valor === null || valor === undefined) return '';
    return String(valor).trim();
  }

  function normalizarLinha(linha: LinhaPlanilha): ProgramacaoImportada {
    return {
      numeroChamado: valorTexto(linha['NÚMERO DO CHAMADO'] ?? linha['NUMERO DO CHAMADO']),
      descricao: valorTexto(linha['DESCRIÇÃO'] ?? linha['DESCRICAO']),
      areaRequisitante: valorTexto(linha['ÁREA REQUISITANTE'] ?? linha['AREA REQUISITANTE']),
      localRealizacao: valorTexto(linha['LOCAL DE REALIZAÇÃO'] ?? linha['LOCAL DE REALIZACAO']),
      tempoExec: valorTexto(linha['TEMPO EXEC']),
      dataInicio: valorTexto(linha['DATA INICIO'] ?? linha['DATA INÍCIO']),
      dataTermino: valorTexto(linha['DATA TÉRMINO'] ?? linha['DATA TERMINO']),
      tipoSolicitacao: valorTexto(linha['TIPO DA SOLICITAÇÃO'] ?? linha['TIPO DA SOLICITACAO']),
      equipe: valorTexto(linha['EQUIPE']),
      encarregado: valorTexto(linha['ENCARREGADO']),
      solicitante: valorTexto(linha['SOLICITANTE']),
      status: 'Programada',
    };
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setErro('');
    setNomeArquivo(file.name);

    const reader = new FileReader();

    reader.onload = (evento) => {
      try {
        const conteudo = evento.target?.result;
        if (!conteudo) {
          setErro('Não foi possível ler o arquivo.');
          return;
        }

        const workbook = XLSX.read(conteudo, { type: 'binary' });
        const primeiraAba = workbook.SheetNames[0];
        const sheet = workbook.Sheets[primeiraAba];

        const linhas = XLSX.utils.sheet_to_json<LinhaPlanilha>(sheet, {
          defval: '',
        });

        if (!linhas.length) {
          setErro('A planilha está vazia.');
          setDadosImportados([]);
          return;
        }

        const dadosTratados = linhas.map(normalizarLinha);

        setDadosImportados(dadosTratados);

        if (typeof window !== 'undefined') {
          localStorage.setItem('programacoesImportadas', JSON.stringify(dadosTratados));
        }
      } catch {
        setErro('Erro ao processar a planilha. Verifique o formato do arquivo e os nomes das colunas.');
        setDadosImportados([]);
      }
    };

    reader.readAsBinaryString(file);
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Importação de dados</p>
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Upload da Programação
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Faça upload da planilha. O sistema vai criar o status inicial de todas as linhas como Programada.
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

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <label className="block text-sm font-semibold text-slate-700">
            Selecionar planilha
          </label>

          <input
            type="file"
            accept=".xlsx,.csv"
            onChange={handleFile}
            className="mt-3 block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm"
          />

          {nomeArquivo && (
            <p className="mt-3 text-sm text-slate-600">
              Arquivo selecionado: <strong>{nomeArquivo}</strong>
            </p>
          )}

          <div className="mt-6 rounded-2xl border border-slate-200 p-4">
            <p className="text-sm font-semibold text-slate-800">Colunas esperadas</p>
            <p className="mt-2 text-sm text-slate-600">
              NÚMERO DO CHAMADO, DESCRIÇÃO, ÁREA REQUISITANTE, LOCAL DE REALIZAÇÃO,
              TEMPO EXEC, DATA INICIO, DATA TÉRMINO, TIPO DA SOLICITAÇÃO, EQUIPE,
              ENCARREGADO e SOLICITANTE.
            </p>
          </div>

          {erro && (
            <div className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {erro}
            </div>
          )}
        </div>

        {dadosImportados.length > 0 && (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900">Pré-visualização da importação</h2>
              <p className="text-sm text-slate-600">
                Total de registros importados: {dadosImportados.length}
              </p>
            </div>

            <div className="overflow-x-auto">
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
                  </tr>
                </thead>

                <tbody>
                  {dadosImportados.map((item, index) => (
                    <tr key={`${item.numeroChamado}-${index}`} className="bg-slate-50 text-sm text-slate-700">
                      <td className="rounded-l-2xl px-4 py-4 font-semibold text-slate-900">
                        {item.numeroChamado}
                      </td>
                      <td className="px-4 py-4">{item.descricao}</td>
                      <td className="px-4 py-4">{item.areaRequisitante}</td>
                      <td className="px-4 py-4">{item.localRealizacao}</td>
                      <td className="px-4 py-4">{item.tempoExec}</td>
                      <td className="px-4 py-4">{item.dataInicio}</td>
                      <td className="px-4 py-4">{item.dataTermino}</td>
                      <td className="px-4 py-4">{item.tipoSolicitacao}</td>
                      <td className="px-4 py-4">{item.equipe}</td>
                      <td className="px-4 py-4">{item.encarregado}</td>
                      <td className="px-4 py-4">{item.solicitante}</td>
                      <td className="rounded-r-2xl px-4 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              Importação concluída na tela. Os dados foram guardados no navegador para uso local.
            </div>
          </div>
        )}
      </div>
    </main>
  );
}