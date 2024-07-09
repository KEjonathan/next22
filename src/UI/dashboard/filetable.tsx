'use client'
import React, { useEffect, useState } from 'react';

interface FileEntry {
  name: string;
  path: string;
}

interface FilesData {
  // uploads: FileEntry[];
  encrypted: FileEntry[];
  decrypted: FileEntry[];
}

const FileTable: React.FC = () => {
  const [files, setFiles] = useState<FilesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/files');
        const data: FilesData = await response.json();
        setFiles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching files:', error);
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleDecrypt = async (fileName: string) => {
    const formData = new FormData();
    formData.append('fileName', fileName);
    formData.append('password', password);

    try {
      const response = await fetch('/api/decrypt', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(`File decrypted and saved at: ${result.path}`);
        // Refresh the file list after decryption
        const updatedResponse = await fetch('/api/files');
        const updatedData: FilesData = await updatedResponse.json();
        setFiles(updatedData);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage('An unexpected error occurred.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Files Overview</h1>
      <div className="flex flex-col w-full gap-2 mt-3">
        {/* <FileCategory title="Uploads" files={files?.uploads} /> */}
        <FileCategory title="Encrypted" files={files?.encrypted} handleDecrypt={handleDecrypt} password={password} setPassword={setPassword} />
        <FileCategory title="Decrypted" files={files?.decrypted} />
      </div>
      {message && (
        <div className="mt-4 text-center">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

const FileCategory: React.FC<{ title: string; files?: FileEntry[]; handleDecrypt?: (fileName: string) => void; password?: string; setPassword?: React.Dispatch<React.SetStateAction<string>> }> = ({ title, files, handleDecrypt, password, setPassword }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {title === "Encrypted" && (
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Password for Decryption</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword && setPassword(e.target.value)}
            className="block w-full px-3 py-2 bg-gray-200 rounded-lg border border-gray-400 placeholder-gray-500 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      )}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">File Name</th>
            <th className="border px-4 py-2">File Path</th>
            {title === "Encrypted" && <th className="border px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {files?.map(file => (
            <tr key={file.path}>
              <td className="border px-4 py-2">{file.name}</td>
              <td className="border px-4 py-2">{file.path}</td>
              {title === "Encrypted" && handleDecrypt && (
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDecrypt(file.name)}
                    className="py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Decrypt
                  </button>
                </td>
              )}
            </tr>
          ))}
          {!files?.length && (
            <tr>
              <td colSpan={title === "Encrypted" ? 3 : 2} className="border px-4 py-2 text-center">No files found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;
