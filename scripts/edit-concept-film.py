"""Build the Stival concept film for the interlude; never touches the hero."""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / 'videos' / '4 takes'
WORK = ROOT / 'video-edit'
OUTPUT = ROOT / 'public' / 'videos'
FFMPEG = Path('E:/Tools/ffmpeg/ffmpeg-9.0.2-essentials_build/bin/ffmpeg.exe')

# Story order: Gustavo, drawing, materials, completed healthcare space.
SHOTS = [
    ('Man_examining_architectural_blue*', 2.0, 240),
    ('Hands_drawing_architectural_plan*', 0.5, 450),
    ('Architect_selecting_project_mate*', 0.5, 555),
    ('Camera_movement_in_health_center*', 0.5, 590),
]


def run(*args):
    subprocess.run([str(FFMPEG), '-hide_banner', '-loglevel', 'error', '-y', *map(str, args)], check=True)


def select_sources():
    result = []
    for pattern, start, mobile_x in SHOTS:
        matches = list(SOURCE.glob(pattern + '.mp4'))
        if len(matches) != 1:
            raise RuntimeError(f'Expected one source for {pattern}; found {len(matches)}')
        if 'ARCCA' in matches[0].name.upper():
            raise RuntimeError('Reference footage must never be used in the Stival film')
        result.append((matches[0], start, mobile_x))
    return result


def edit_master(sources, mobile):
    fade = .3
    shot_duration = 5.3
    args, filters = [], []
    # An extra fragment of the opening shot lets the final dissolve blend the loop seam.
    for index, (path, start, mobile_x) in enumerate(sources + [sources[0]]):
        args.extend(['-ss', start, '-t', shot_duration if index < 4 else fade + .1, '-i', path])
        size = f'crop=810:1080:{mobile_x}:0,scale=720:960' if mobile else 'scale=1600:900'
        filters.append(
            f'[{index}:v]fps=24,{size},setsar=1,settb=AVTB,setpts=PTS-STARTPTS,'
            f'eq=saturation=0.94:contrast=1.025:brightness=-0.008,format=yuv420p[v{index}]'
        )
    previous = 'v0'
    for index in range(1, 5):
        label = f'xf{index}'
        filters.append(f'[{previous}][v{index}]xfade=transition=fade:duration={fade}:offset={index * 5}[{label}]')
        previous = label
    filters.append(f'[{previous}]trim=start={fade}:duration=20,setpts=PTS-STARTPTS[out]')
    master = WORK / ('concept-mobile-master.mp4' if mobile else 'concept-master.mp4')
    if not (master.exists() and '--reuse-masters' in sys.argv):
        run(*args, '-filter_complex_threads', '2', '-filter_complex', ';'.join(filters),
            '-map', '[out]', '-an', '-pix_fmt', 'yuv420p', '-c:v', 'libx264',
            '-preset', 'fast', '-crf', '18', '-threads', '4', '-movflags', '+faststart', master)
    return master


def export(master, mobile):
    base = 'concept-mobile' if mobile else 'concept'
    run('-i', master, '-an', '-pix_fmt', 'yuv420p', '-c:v', 'libvpx-vp9',
        '-b:v', '0', '-crf', '35' if mobile else '33', '-deadline', 'good',
        '-cpu-used', '5', '-row-mt', '1', '-threads', '4', OUTPUT / f'{base}.webm')
    run('-i', master, '-an', '-pix_fmt', 'yuv420p', '-c:v', 'libx264',
        '-preset', 'slow', '-crf', '26' if mobile else '24', '-threads', '4',
        '-movflags', '+faststart', OUTPUT / f'{base}.mp4')
    run('-ss', '0.6', '-i', master, '-frames:v', '1', '-q:v', '85',
        OUTPUT / f'{base}-poster.webp')


if __name__ == '__main__':
    OUTPUT.mkdir(exist_ok=True)
    sources = select_sources()
    for mobile in ((True,) if '--mobile-only' in sys.argv else (False, True)):
        print('Editing', 'mobile' if mobile else 'desktop', flush=True)
        export(edit_master(sources, mobile), mobile)
    print('Done', flush=True)
