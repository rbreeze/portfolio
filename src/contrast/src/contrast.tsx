import * as React from 'react';

const parseHex = (hex: string) => {
    hex = (hex || '').replace(/(\r\n|\n|\r)/gm, '') as string;
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseChannel(result[1]),
              g: parseChannel(result[2]),
              b: parseChannel(result[3]),
          }
        : null;
};

const parseChannel = (c: string) => {
    const cs = parseInt(c, 16) / 255;
    return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
};

interface RGB {
    r: number;
    g: number;
    b: number;
}

const relativeLuminance = (hex: string) => {
    hex = (hex || '').replace(' ', '').replace(/(\r\n|\n|\r)/gm, '') as string;
    const rgb = parseHex(hex) || ({} as RGB);
    return 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
};

const contrast = (one: Color, two: Color) => {
    let a = one.luminance;
    let b = two.luminance;
    if (a > b) {
        const tmp = a;
        a = b;
        b = tmp;
    }
    return 1 / ((a + 0.05) / (b + 0.05));
};

export interface Color {
    name: string;
    value: string;
    luminance: number;
}

export interface Comparison {
    a: Color;
    b: Color;
    contrast: number;
    aa: boolean;
    aaa: boolean;
}

export const stringToColor = (s: string): Color => {
    const parts = s.split(': ');
    return {
        name: parts[0].replace(/(\r\n|\n|\r)/gm, ''),
        value: parts[1],
        luminance: relativeLuminance(parts[1]),
    } as Color;
};

export const linesToColors = (l: string): Color[] => {
    const result = [];
    for (const s of l.split(';')) {
        result.push(stringToColor(s));
    }
    return result;
};

export const CompareCombinations = (colors: Color[]): Comparison[] => {
    let i = 1;
    let prev = 1;

    const results: Comparison[] = [];
    for (const a of colors) {
        while (i < colors.length - 1) {
            const b = colors[i];
            const cont = contrast(a, b);
            results.push({a, b, contrast: cont, aa: cont > 4.5, aaa: cont > 7});
            i++;
        }
        prev++;
        i = prev;
    }

    return results;
};

const ColorEl = (c: Color) => {
    const color = c.luminance < 0.4 ? 'white' : '#0d1117';
    return <div style={{backgroundColor: c.value, padding: '10px', borderRadius: '5px', marginRight: '10px', width: '150px', textAlign: 'center', color}}>{c.name}</div>;
};

const Comparisons = (comps: Comparison[], copyVars: boolean) => {
    const yellow = '#e3b341';
    const green = '#2ea043';
    return (
        <div style={{display: 'flex', flexShrink: 0, flexGrow: 1, flexWrap: 'wrap'}}>
            {comps.map((c) => (
                <div style={{display: 'flex', margin: '0.5em', alignItems: 'center'}}>
                    {ColorEl(c.a)}
                    {ColorEl(c.b)}
                    <div
                        style={{
                            width: '50px',
                            textAlign: 'center',
                            fontFamily: 'Monaco',
                            fontSize: '13px',
                            marginRight: '10px',
                            color: c.aaa ? green : c.aa ? yellow : 'white',
                            fontWeight: c.aa ? 600 : 400,
                        }}>
                        {Math.round(c.contrast * 100) / 100}
                    </div>
                    <button
                        style={{backgroundColor: c.a.value, color: c.b.value, padding: '5px', borderRadius: '3px', marginRight: '5px', cursor: 'pointer'}}
                        onClick={async () => {
                            const background = copyVars ? c.a.name : c.a.value;
                            const color = copyVars ? c.b.name : c.b.value;
                            await navigator.clipboard.writeText(`background-color: ${background};\ncolor: ${color};\n`);
                        }}>
                        COPY <i className='fa fa-clipboard' />
                    </button>
                    <div style={{width: '20px', textAlign: 'center'}}>
                        {c.aaa ? (
                            <i className='fa fa-check' style={{color: green}} />
                        ) : c.aa ? (
                            <i className='fa fa-exclamation-triangle' style={{color: yellow}} />
                        ) : (
                            <i className='fa fa-times' />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export const Form = () => {
    const [lines, setLines] = React.useState('');
    const [comparisons, setComparisons] = React.useState([] as Comparison[]);
    const [rawComparisons, setRawComparisons] = React.useState([] as Comparison[]);
    const [AA, setAA] = React.useState(false);
    const [AAA, setAAA] = React.useState(false);
    const [copyVars, setCopyVars] = React.useState(false);
    return (
        <div>
            <label style={{marginBottom: '0.5em'}}>SCSS Style Variables</label>
            <p>Define variables with a colon, separate lines with a semicolon</p>
            <textarea onChange={(e) => setLines(e.target.value)} value={lines} style={{height: '200px', width: '90%', marginBottom: '0.5em'}} />
            <div style={{display: 'flex'}}>
                <button
                    onClick={() => {
                        let comps = CompareCombinations(linesToColors(lines));
                        setRawComparisons(comps);
                        if (AA) {
                            comps = comps.filter((c) => c.aa);
                        }
                        if (AAA) {
                            comps = comps.filter((c) => c.aaa);
                        }
                        setComparisons(comps);
                    }}>
                    Compare
                </button>
                <button
                    onClick={() => {
                        setComparisons(!AA ? comparisons.filter((c) => c.aa) : rawComparisons);
                        setAA(!AA);
                    }}
                    className={AA ? 'selected' : ''}>
                    AA
                </button>
                <button
                    onClick={() => {
                        setComparisons(!AAA ? comparisons.filter((c) => c.aaa) : rawComparisons.filter((c) => (AA ? c.aa : true)));
                        if (!AAA) {
                            setAA(!AAA);
                        }
                        setAAA(!AAA);
                    }}
                    className={AAA ? 'selected' : ''}>
                    AAA
                </button>
                <button
                    onClick={() => {
                        setCopyVars(!copyVars);
                    }}
                    className={copyVars ? 'selected' : ''}>
                    Copy Variables <i className='fas fa-code' />
                </button>
            </div>
            {comparisons.length > 0 && Comparisons(comparisons, copyVars)}
        </div>
    );
};
