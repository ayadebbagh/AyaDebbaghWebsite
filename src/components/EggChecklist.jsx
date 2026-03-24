import { EASTER_EGGS } from '../data';

const TOTAL = EASTER_EGGS.length;

export default function EggChecklist({ foundEggs }) {
  const foundCount = foundEggs.length;
  const pct = Math.round((foundCount / TOTAL) * 100);

  return (
    <div className="px-4 py-3 font-mono text-[11px] bg-termbg h-full overflow-y-auto term-scroll">

      <h3 style={{ fontFamily: "'PPEditorialOld-Italic', cursive", color: '#270722', fontSize: 20, marginBottom: 4 }}>
        ✦ flag board
      </h3>
      <div style={{ textAlign: 'center', color: '#D897B8', fontSize: 10, letterSpacing: 3, margin: '4px 0 12px' }}>
        ✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦
      </div>

      {/* progress */}
      <div className="mb-4">
        <div className="flex justify-between text-[10px] text-tmuted mb-1.5">
          <span className="text-pink">{foundCount} / {TOTAL} flags captured</span>
          <span>{pct}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full overflow-hidden bg-border/30">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: '#D897B8' }}
          />
        </div>
      </div>

      {/* egg list */}
      <div className="flex flex-col gap-1.5">
        {EASTER_EGGS.map(egg => {
          const found = foundEggs.includes(egg.key);
          return (
            <div
              key={egg.key}
              className="px-3 py-2 rounded-sm border text-[10px]"
              style={{
                borderColor: found ? '#7A9A50' : '#D897B8',
                background:  found ? '#EFF5E8' : '#F2E8DC',
              }}
            >
              <div className="flex items-start gap-2">
                <span style={{ color: found ? '#7A9A50' : '#B0A8B8', flexShrink: 0 }}>
                  {found ? '[✓]' : '[?]'}
                </span>
                <div className="flex-1 min-w-0">
                  <p style={{ color: found ? '#4A3858' : '#B0A8B8' }}>
                    {found ? egg.hint : '???????????????'}
                  </p>
                  {found && (
                    <p className="mt-0.5 break-all" style={{ color: '#7A9A50' }}>
                      {egg.flag}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {foundCount === TOTAL && TOTAL > 0 && (
        <div className="mt-4 text-center text-[10px]" style={{ color: '#D897B8' }}>
          ✦ all flags captured. you are the hacker. ✦
        </div>
      )}

      <div className="mt-4 text-center text-[10px] text-border tracking-widest">
        ✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦
      </div>
    </div>
  );
}
