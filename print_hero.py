from pathlib import Path
path = Path('__tests__/Hero.test.tsx')
for idx,line in enumerate(path.read_text().splitlines(), 1):
    print(f'{idx}: {line}')
