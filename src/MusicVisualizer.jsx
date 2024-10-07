import React, { useEffect, useRef } from 'react';

function MusicVisualizer({ audioRef }) {
  const canvasRef = useRef(null);
  const analyserRef = useRef(null); // 存儲分析器
  const sourceRef = useRef(null);   // 存儲MediaElementSourceNode
  const audioCtxRef = useRef(null); // 存儲 AudioContext

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    // 檢查是否已經創建 AudioContext
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const audioCtx = audioCtxRef.current;

    // 檢查是否已經創建 MediaElementSourceNode
    if (!sourceRef.current) {
      sourceRef.current = audioCtx.createMediaElementSource(audio);
    }

    // 檢查是否已經創建 analyser
    if (!analyserRef.current) {
      analyserRef.current = audioCtx.createAnalyser();
      analyserRef.current.fftSize = 256;
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioCtx.destination);
    }

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');

    // 繪圖函數
    const draw = () => {
      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        canvasCtx.fillStyle = `white`;
        canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
      }
    };

    draw();

    return () => {
      // Optional: You can decide whether to close the AudioContext when the component unmounts.
      // audioCtxRef.current.close();
    };
  }, [audioRef]); // 確保在 audioRef 改變時重新運行 useEffect

  return <canvas ref={canvasRef}   className='wave'></canvas>;
}

export default MusicVisualizer;
