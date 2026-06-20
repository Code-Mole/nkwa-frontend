import { Check, ChevronRight, Globe } from 'lucide-react';
import { LANGUAGES } from '../../data/constants';

/**
 * LanguageSelect — matches the mobile app's "Select your language to
 * call" bottom sheet: a two-letter avatar badge, language name, and a
 * "Nationwide" coverage line, with a chevron to expand/select.
 */
export default function LanguageSelect({ value, onChange }) {
  return (
    <div className="space-y-2.5">
      {LANGUAGES.map((lang) => {
        const selected = value?.code === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => onChange(lang)}
            className={[
              'w-full flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left',
              selected
                ? 'border-nkwa-500 bg-nkwa-50'
                : 'border-transparent bg-surface-card hover:border-nkwa-100',
            ].join(' ')}
          >
            <div
              className={[
                'w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0',
                selected ? 'bg-nkwa-gradient text-white' : 'bg-nkwa-100 text-nkwa-700',
              ].join(' ')}
            >
              {lang.code}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-ink-900 text-[15px]">{lang.label}</p>
              <p className="text-xs text-ink-500 flex items-center gap-1 mt-0.5">
                <Globe className="w-3 h-3" /> Nationwide
              </p>
            </div>
            {selected ? (
              <div className="w-6 h-6 rounded-full bg-nkwa-500 text-white flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              </div>
            ) : (
              <ChevronRight className="w-5 h-5 text-ink-300 flex-shrink-0" />
            )}
          </button>
        );
      })}
    </div>
  );
}
