import React, { useRef, useEffect, useState } from 'react';

interface DrawingCanvasProps {
  onClose: () => void;
  onDone: (imageData: { data: string; mimeType: string }) => void;
}

type Tool = 'pencil' | 'eraser';

const ToolbarButton: React.FC<{ onClick: () => void; isActive?: boolean; children: React.ReactNode; title: string }> = ({ onClick, isActive, children, title }) => (
  <button
    onClick={onClick}
    title={title}
    className={`p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
  >
    {children}
  </button>
);

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ onClose, onDone }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>('pencil');
  const [color, setColor] = useState('#FFFFFF');
  const [lineWidth, setLineWidth] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    contextRef.current = context;

    const handleResize = () => {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        context.putImageData(imageData, 0, 0);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  useEffect(() => {
    if (contextRef.current) {
        contextRef.current.strokeStyle = color;
        contextRef.current.lineWidth = lineWidth;
    }
  }, [color, lineWidth]);

  const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    if (!contextRef.current) return;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    if (!contextRef.current) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };
  
  const clearCanvas = () => {
      const canvas = canvasRef.current;
      const context = contextRef.current;
      if(canvas && context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
      }
  }

  const handleDone = () => {
      const canvas = canvasRef.current;
      if(!canvas) return;
      const dataUrl = canvas.toDataURL('image/png');
      const [header, data] = dataUrl.split(',');
      const mimeType = 'image/png';
      onDone({ data, mimeType });
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-gray-800/80 backdrop-blur-sm p-2 rounded-xl border border-white/10 shadow-lg flex items-center gap-2">
        <ToolbarButton onClick={() => setTool('pencil')} isActive={tool === 'pencil'} title="Pencil">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
        </ToolbarButton>
        <ToolbarButton onClick={() => setTool('eraser')} isActive={tool === 'eraser'} title="Eraser">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
        </ToolbarButton>
        <div className="relative p-3 rounded-lg bg-gray-700">
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Select color"/>
            <div className="w-5 h-5 rounded-full border-2 border-white" style={{ backgroundColor: color }}></div>
        </div>
         <ToolbarButton onClick={clearCanvas} title="Clear Canvas">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        </ToolbarButton>

        <div className="h-8 w-px bg-gray-600 mx-2"></div>
        
        <button onClick={onClose} className="px-4 py-2 text-sm font-semibold bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors">Cancel</button>
        <button onClick={handleDone} className="px-5 py-2 text-sm font-semibold bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors">Done</button>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onMouseLeave={finishDrawing}
        className="cursor-crosshair"
      />
    </div>
  );
};