import zipfile
import xml.etree.ElementTree as ET

docx_file = r'c:\Users\Ronaldo\Desktop\Projetos\E-SAUDE\Esaude - Landing Page PJ.docx'
with zipfile.ZipFile(docx_file) as z:
    xml_content = z.read('word/document.xml')

tree = ET.fromstring(xml_content)
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

paragraphs = []
for node in tree.findall('.//w:p', ns):
    text = "".join([t.text for t in node.findall('.//w:t', ns) if t.text])
    if text.strip():
        paragraphs.append(text)

with open('temp_docx.txt', 'w', encoding='utf-8') as f:
    f.write("\n".join(paragraphs))
