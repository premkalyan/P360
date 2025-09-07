#!/usr/bin/env python3
"""
Extract SOW Document Content
"""

import os
import sys
from pathlib import Path
import PyPDF2

def extract_sow_content():
    """Extract content from SOW PDF"""
    script_dir = Path(__file__).parent
    sow_path = script_dir / "clientDocs" / "Pipeline360_SOW_Final.pdf"
    output_path = script_dir / "documentation" / "P360_SOW_Final_extracted.md"
    
    print(f"Extracting SOW content from: {sow_path}")
    
    try:
        content = []
        content.append("# Pipeline360 SOW Final - Extracted Content")
        content.append("=" * 50)
        content.append("")
        
        with open(sow_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            total_pages = len(pdf_reader.pages)
            
            content.append(f"**Total Pages**: {total_pages}")
            content.append("")
            
            for page_num in range(total_pages):
                content.append(f"## Page {page_num + 1}")
                content.append("-" * 20)
                
                try:
                    page = pdf_reader.pages[page_num]
                    text = page.extract_text()
                    
                    if text.strip():
                        content.append(text.strip())
                    else:
                        content.append("(No extractable text content)")
                        
                except Exception as e:
                    content.append(f"Error extracting page {page_num + 1}: {str(e)}")
                
                content.append("")
        
        full_content = "\n".join(content)
        
        # Save to file
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(full_content)
        
        print(f"✅ SOW content extracted to: {output_path}")
        return full_content
        
    except Exception as e:
        error_msg = f"Error extracting SOW content: {str(e)}"
        print(error_msg)
        return error_msg

if __name__ == "__main__":
    extract_sow_content()
