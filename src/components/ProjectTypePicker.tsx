import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

const choices = [
  'Hospital ou unidade de saúde',
  'Clínica ou consultório',
  'Laboratório ou diagnóstico',
  'Consultoria ou adequação',
  'Outro projeto',
];

type Props = {
  value: string;
  onChange: (value: string) => void;
  invalid: boolean;
  buttonRef: React.RefObject<HTMLButtonElement>;
};

export function ProjectTypePicker({ value, onChange, invalid, buttonRef }: Props) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);
  const choose = (index: number) => {
    onChange(choices[index]);
    setActive(index);
    setOpen(false);
    buttonRef.current?.focus();
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        setActive(Math.max(0, choices.indexOf(value)));
        setOpen(true);
      } else setActive(index => Math.max(0, Math.min(choices.length - 1, index + (event.key === 'ArrowDown' ? 1 : -1))));
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      setOpen(true);
      setActive(event.key === 'Home' ? 0 : choices.length - 1);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (open) choose(active);
      else { setActive(Math.max(0, choices.indexOf(value))); setOpen(true); }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Tab') setOpen(false);
  };
  return <div ref={wrapper} className={`project-type-picker ${open ? 'is-open' : ''}`}>
    <input type="hidden" name="type" value={value} />
    <button ref={buttonRef} id="contact-type" type="button" className="project-type-trigger" role="combobox" aria-label="O que você está planejando?" aria-haspopup="listbox" aria-expanded={open} aria-controls="contact-type-options" aria-activedescendant={open ? `contact-type-option-${active}` : undefined} aria-invalid={invalid} aria-describedby={invalid ? 'contact-type-error' : undefined} onClick={() => { setActive(Math.max(0, choices.indexOf(value))); setOpen(!open); }} onKeyDown={onKeyDown}>
      <span className={value ? '' : 'is-placeholder'}>{value || 'Selecione o tipo de projeto'}</span><ChevronDown size={17} aria-hidden="true" />
    </button>
    {open && <div id="contact-type-options" className="project-type-options" role="listbox" aria-label="Tipo de projeto">
      {choices.map((choice, index) => <div key={choice} id={`contact-type-option-${index}`} className={active === index ? 'is-active' : ''} role="option" aria-selected={value === choice} onMouseEnter={() => setActive(index)} onClick={() => choose(index)}>
        <span className="project-type-number">0{index + 1}</span><span>{choice}</span><ArrowUpRight size={15} aria-hidden="true" />
      </div>)}
    </div>}
    {invalid && <p id="contact-type-error" className="field-error" role="alert">Selecione o tipo de projeto para continuar.</p>}
  </div>;
}
