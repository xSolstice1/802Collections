import { useState, useCallback } from 'react';
import { 
  Copy, 
  Check, 
  Trash2, 
  Download, 
  Upload, 
  AlertCircle,
  FileJson
} from 'lucide-react';

/**
 * JSON Formatter App
 * 
 * A utility tool for formatting, validating, and minifying JSON data.
 * Demonstrates how to build a functional utility app within the platform.
 */
const JsonFormatterApp = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'format' | 'minify'>('format');
  const [indentSize, setIndentSize] = useState(2);

  const formatJSON = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter JSON data');
      setOutput('');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const result = mode === 'format' 
        ? JSON.stringify(parsed, null, indentSize)
        : JSON.stringify(parsed);
      
      setOutput(result);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid JSON';
      setError(errorMessage);
      setOutput('');
    }
  }, [input, mode, indentSize]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = output;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setError(null);
  }, []);

  const handleDownload = useCallback(() => {
    if (!output) return;
    
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [output]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setInput(content);
    };
    reader.readAsText(file);
    
    // Reset input so the same file can be selected again
    event.target.value = '';
  }, []);

  const handleSampleJSON = useCallback(() => {
    const sample = {
      name: "802Collections",
      version: "1.0.0",
      description: "A modular web application platform",
      features: [
        "App Registry System",
        "Lazy Loading",
        "TypeScript Support",
        "Dark Mode Theme"
      ],
      config: {
        theme: {
          primary: "#76B900",
          mode: "dark"
        },
        api: {
          endpoint: "https://api.example.com",
          timeout: 5000
        }
      },
      stats: {
        totalApps: 5,
        activeUsers: 1250,
        uptime: 99.9
      }
    };
    setInput(JSON.stringify(sample, null, 2));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-802/10 flex items-center justify-center">
          <FileJson className="w-5 h-5 text-802" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-dark-100">JSON Formatter</h2>
          <p className="text-sm text-dark-500">Format, validate, and minify JSON data</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-4 card">
        {/* Mode Toggle */}
        <div className="flex bg-dark-800 rounded-lg p-1">
          <button
            onClick={() => setMode('format')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              mode === 'format' 
                ? 'bg-802 text-dark-950' 
                : 'text-dark-400 hover:text-dark-200'
            }`}
          >
            Format
          </button>
          <button
            onClick={() => setMode('minify')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              mode === 'minify' 
                ? 'bg-802 text-dark-950' 
                : 'text-dark-400 hover:text-dark-200'
            }`}
          >
            Minify
          </button>
        </div>

        {/* Indent Size (only for format mode) */}
        {mode === 'format' && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-dark-500">Indent:</span>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="input w-20 py-1 text-sm"
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={8}>8</option>
            </select>
          </div>
        )}

        <div className="flex-1" />

        {/* Action Buttons */}
        <button onClick={handleSampleJSON} className="btn-secondary text-sm">
          <Upload className="w-4 h-4" />
          Sample
        </button>
        <label className="btn-secondary text-sm cursor-pointer">
          <Upload className="w-4 h-4" />
          Upload
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        <button 
          onClick={handleClear} 
          className="btn-ghost text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
      </div>

      {/* Editor Area */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-dark-300">Input JSON</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here, e.g., {"key": "value"}'
            className="input h-80 font-mono text-sm resize-none"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-dark-300">Output</label>
            {output && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="btn-ghost text-sm flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-802" />
                      <span className="text-802">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  className="btn-ghost text-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
          <div className="relative">
            <textarea
              value={output}
              readOnly
              placeholder="Formatted JSON will appear here..."
              className="input h-80 font-mono text-sm resize-none"
              spellCheck={false}
            />
            {error && (
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Process Button */}
      <div className="flex justify-center">
        <button onClick={formatJSON} className="btn-primary px-8 py-3 text-base">
          {mode === 'format' ? 'Format JSON' : 'Minify JSON'}
        </button>
      </div>
    </div>
  );
};

export default JsonFormatterApp;