"""Generate the responsive hero assets: python scripts/generate-hero-images.py."""
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
output = root / 'public' / 'hero'
output.mkdir(exist_ok=True)
for filename, widths in {
    'hero-bg.jpg': [640, 960, 1488],
    'hero-bg2.jpg': [480, 694],
    'about-img.jpg': [640, 888],
}.items():
    with Image.open(root / 'public' / filename) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
        for width in widths:
            size = (width, round(image.height * width / image.width))
            target = output / f'{Path(filename).stem}-{width}.webp'
            image.resize(size, Image.Resampling.LANCZOS).save(target, 'WEBP', quality=75, method=6)
            print(f'{target.name}: {target.stat().st_size:,} bytes')
