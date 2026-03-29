'use client';

import { useState } from 'react';
import Link from 'next/link';
import * as XLSX from 'xlsx';

type LinhaImportada = Record<string, string | number | boolean | null>;

export default function UploadPage() {
  const [dados, setDados] = useState<LinhaImportada[]>([]);
  const [nomeArquivo, setNomeArquivo] = useState('');

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setNomeArquivo(file.name);

    const reader = new FileReader();

    reader.onload = (evento) => {
      const conteudo = evento.target?.result;
      if (!conteudo) return;

      const workbook = XLSX.read(conteudo, { type: 'binary' });
      const primeiraAba = workbook.SheetNames[0];
      const sheet = workbook.Sheets[primeiraAba];

      const jsonData = XLSX.utils.sheet_to_json<LinhaImportada>(sheet, {
        defval: '',
      });

      setDados(jsonData);
    };

    reader.readAsBinaryString(file);
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Importação de dados</p>
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Upload da Programação
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Selecione uma planilha Excel ou CSV para importar as ordens de serviço.
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
            Selecionar arquivo
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
        </div>

        {dados.length > 0 && (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900">Dados importados</h2>
              <p className="text-sm text-slate-600">
                Total de registros carregados: {dados.length}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-left text-sm text-slate-500">
                    {Object.keys(dados[0]).map((chave) => (
                      <th key={chave} className="px-4 py-2">
                        {chave}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {dados.map((linha, index) => (
                    <tr key={index} className="bg-slate-50 text-sm text-slate-700">
                      {Object.keys(dados[0]).map((chave) => (
                        <td key={chave} className="px-4 py-3">
                          {String(linha[chave] ?? '')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}