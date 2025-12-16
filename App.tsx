import React, { useState, useRef } from 'react';
import { AppState } from './types';
import { consultOracle } from './services/oracleService';
import { FALLBACK_MESSAGES } from './constants';
import MysticalBackground from './components/MysticalBackground';
import { CardFrame } from './components/CardFrame';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  
  // Audio context for sound effects (Optional - kept simple for now, visual focus)

  const handleConsult = async () => {
    if (appState === AppState.THINKING) return;
    
    setAppState(AppState.THINKING);
    setError(false);
    setAnswer('');

    // Minimum animation time to build suspense
    const minTimePromise = new Promise(resolve => setTimeout(resolve, 2500));
    
    try {
      // Run API call and Timer in parallel
      const [apiResponse] = await Promise.all([
        consultOracle(query),
        minTimePromise
      ]);

      setAnswer(apiResponse);
      setAppState(AppState.REVEALED);
    } catch (e) {
      console.error(e);
      setError(true);
      const randomFallback = FALLBACK_MESSAGES[Math.floor(Math.random() * FALLBACK_MESSAGES.length)];
      setAnswer(randomFallback);
      setAppState(AppState.REVEALED);
    }
  };

  const handleReset = () => {
    setQuery('');
    setAnswer('');
    setAppState(AppState.IDLE);
    setError(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative text-amber-100/90 overflow-hidden">
      <MysticalBackground />

      <main className="z-10 w-full max-w-md perspective-1000">
        
        {/* Title Section */}
        <header className="text-center mb-8 relative animate-fade-in-up">
          <div className="inline-block border-b border-amber-600/50 pb-2 px-8">
            <h1 className="text-3xl md:text-4xl font-mystic text-amber-400 tracking-widest drop-shadow-md">
              解答之書
            </h1>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-700 mt-1">The Office Oracle</p>
          </div>
        </header>

        {/* Main Card */}
        <div className={`transition-all duration-700 transform ${appState === AppState.THINKING ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}>
          
          <CardFrame className={`min-h-[450px] transition-all duration-500 ${appState === AppState.THINKING ? 'animate-breathe' : ''}`}>
            
            {/* STATE: IDLE (Input) */}
            {appState === AppState.IDLE && (
              <div className="flex flex-col items-center justify-center h-full w-full space-y-8 animate-fade-in-up">
                
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full border border-amber-500/30 flex items-center justify-center mx-auto mb-4 bg-slate-800/50">
                     {/* Eye Icon */}
                    <svg className="w-8 h-8 text-amber-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <p className="text-lg font-serif italic text-amber-200/80">
                    在這渾沌的職場中，<br/>你為何事迷惘？
                  </p>
                </div>

                <div className="w-full px-4">
                  <input
                    type="text"
                    maxLength={50}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="默念問題，或在此輸入..."
                    className="w-full bg-slate-950/50 border-b border-amber-700/50 text-center text-amber-100 py-3 px-2 focus:outline-none focus:border-amber-500 transition-colors placeholder-amber-900/40 font-serif"
                  />
                </div>

                <button
                  onClick={handleConsult}
                  className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-full hover:bg-amber-900/20 transition-all duration-300 border border-amber-600/30"
                >
                  <span className="relative z-10 text-amber-400 font-mystic tracking-widest group-hover:text-amber-200 transition-colors">
                    揭示命運
                  </span>
                  <div className="absolute inset-0 bg-amber-600/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </button>

                <p className="text-[10px] text-amber-800/60 mt-8 absolute bottom-4">
                   *僅供娛樂與心靈啟發，非專業建議
                </p>
              </div>
            )}

            {/* STATE: THINKING (Animation) */}
            {appState === AppState.THINKING && (
              <div className="flex flex-col items-center justify-center h-full w-full">
                <div className="relative w-24 h-24">
                  {/* Rotating Rings */}
                  <div className="absolute inset-0 border-t-2 border-amber-500/80 rounded-full animate-spin"></div>
                  <div className="absolute inset-2 border-r-2 border-purple-500/60 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-amber-200 rounded-full animate-ping"></div>
                  </div>
                </div>
                <p className="mt-8 text-amber-400/80 font-serif tracking-widest text-sm animate-pulse">
                  命運推演中...
                </p>
              </div>
            )}

            {/* STATE: REVEALED (Answer) */}
            {appState === AppState.REVEALED && (
              <div className="flex flex-col items-center justify-center h-full w-full animate-fade-in-up text-center px-6">
                
                {/* Decorative Icon Top */}
                <div className="mb-8 opacity-60">
                   <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                   </svg>
                </div>

                <div className="relative py-8">
                  <span className="text-4xl absolute -top-2 -left-4 text-amber-800/40 font-serif">“</span>
                  <h2 className="text-2xl md:text-3xl font-bold font-serif text-amber-100 leading-relaxed tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {answer}
                  </h2>
                  <span className="text-4xl absolute -bottom-6 -right-4 text-amber-800/40 font-serif">”</span>
                </div>

                <div className="mt-12">
                   <button
                    onClick={handleReset}
                    className="text-xs tracking-[0.2em] text-amber-600/70 hover:text-amber-400 transition-colors uppercase border-b border-transparent hover:border-amber-500/50 pb-1"
                  >
                    關閉啟示
                  </button>
                </div>
              </div>
            )}

          </CardFrame>
        </div>
      </main>
    </div>
  );
};

export default App;
