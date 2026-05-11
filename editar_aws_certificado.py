from PIL import Image, ImageDraw, ImageFont
import numpy as np

# Caminhos e configurações
FONT_PATH_REGULAR = '/System/Library/Fonts/HelveticaNeue.ttc'
FONT_INDEX_REGULAR = 0
FONT_INDEX_BOLD = 1

img = Image.open('aws_cloud_practitioner.png')

# Detectar a cor correta do fundo da imagem
arr = np.array(img)
# Amostra de pixels do fundo (canto superior esquerdo, longe de qualquer texto)
bg_samples = arr[100:150, 100:150, :3]
bg_color_samples = bg_samples.reshape(-1, 3)
# Usar a cor mais comum
from collections import Counter
color_counts = Counter(tuple(c) for c in bg_color_samples)
BG_DARK = color_counts.most_common(1)[0][0]

print(f"Cor do fundo detectada: RGB{BG_DARK}")

# Cores para o texto
TEXT_WHITE = (255, 255, 255)
TEXT_GOLD = (255, 165, 0)

draw = ImageDraw.Draw(img)

# ====== MUDANÇA 1: NOME ======
# Limpar área MUITO GRANDE para garantir que todo o nome anterior seja coberto
# Aumentei as margens significativamente
draw.rectangle([0, 140, 1236, 320], fill=BG_DARK)

# Fonte para o nome
font_name = ImageFont.truetype(FONT_PATH_REGULAR, 54, index=FONT_INDEX_BOLD)

# Renderizar novo nome com posição ajustada
novo_nome = "Michel Ferraz"
draw.text((90, 208), novo_nome, font=font_name, fill=TEXT_WHITE)

# ====== MUDANÇA 2: DATAS ======
# Limpar área GRANDE para as datas (remover o box de validação anterior)
# y: 640-920 (limpar toda a área anterior)
draw.rectangle([30, 640, 1206, 920], fill=BG_DARK)

font_date_label = ImageFont.truetype(FONT_PATH_REGULAR, 18, index=FONT_INDEX_BOLD)
font_date_value = ImageFont.truetype(FONT_PATH_REGULAR, 20, index=FONT_INDEX_REGULAR)

# Issue Date (posição ajustada para melhor distribuição)
issue_date_y = 700
issue_label = "Issue Date: "
issue_value = "abr 19, 2023"

draw.text((100, issue_date_y), issue_label, font=font_date_label, fill=TEXT_WHITE)
bbox_issue = font_date_label.getbbox(issue_label)
issue_value_x = 100 + (bbox_issue[2] - bbox_issue[0])
draw.text((issue_value_x, issue_date_y), issue_value, font=font_date_value, fill=TEXT_WHITE)

# Expiration Date (posição ajustada para melhor distribuição)
expiration_y = 760
expiration_label = "Expiration Date: "
expiration_value = "abr 19, 2028"

draw.text((100, expiration_y), expiration_label, font=font_date_label, fill=TEXT_WHITE)
bbox_expiration = font_date_label.getbbox(expiration_label)
expiration_value_x = 100 + (bbox_expiration[2] - bbox_expiration[0])
draw.text((expiration_value_x, expiration_y), expiration_value, font=font_date_value, fill=TEXT_WHITE)

# ====== SALVAR ======
img.save('aws_cloud_practitioner_modificado.png')
print("✓ Certificado otimizado com sucesso!")
print(f"  ✓ Cor de fundo detectada e aplicada corretamente: RGB{BG_DARK}")
print("  ✓ Nome: Michel Ferraz")
print("  ✓ Issue Date: abr 19, 2023")
print("  ✓ Expiration Date: abr 19, 2028")
