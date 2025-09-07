#!/usr/bin/env python3
"""
P360 Client Documents Extractor
Extracts content from Excel and PDF files for comprehensive analysis
"""

import os
import sys
from pathlib import Path
import pandas as pd
import PyPDF2
from openpyxl import load_workbook

def extract_excel_content(excel_path, output_path):
    """
    Extract content from Excel file including all sheets and tables
    """
    print(f"Extracting Excel content from: {excel_path}")
    
    try:
        # Read Excel file with pandas
        excel_file = pd.ExcelFile(excel_path)
        content = []
        
        content.append(f"# Excel File: {os.path.basename(excel_path)}")
        content.append("=" * 50)
        content.append("")
        content.append(f"**Total Sheets**: {len(excel_file.sheet_names)}")
        content.append("")
        
        for sheet_name in excel_file.sheet_names:
            content.append(f"## Sheet: {sheet_name}")
            content.append("-" * 30)
            
            try:
                # Read the sheet
                df = pd.read_excel(excel_path, sheet_name=sheet_name)
                
                # Basic info about the sheet
                content.append(f"**Dimensions**: {df.shape[0]} rows × {df.shape[1]} columns")
                content.append("")
                
                # Column headers
                if not df.empty:
                    content.append("**Columns**:")
                    for col in df.columns:
                        content.append(f"- {col}")
                    content.append("")
                    
                    # First few rows of data (non-empty)
                    content.append("**Sample Data**:")
                    # Convert to string and handle NaN values
                    df_string = df.head(10).fillna("").astype(str)
                    content.append(df_string.to_string(index=False))
                    content.append("")
                    
                    # If there are many rows, show summary stats
                    if len(df) > 10:
                        content.append(f"**Total Records**: {len(df)} (showing first 10)")
                        content.append("")
                        
                        # Show unique values in key columns if they exist
                        for col in df.columns:
                            if df[col].dtype == 'object' and len(df[col].unique()) < 20:
                                unique_vals = [str(val) for val in df[col].unique() if str(val) != 'nan' and str(val) != '']
                                if unique_vals:
                                    content.append(f"**{col} - Unique Values**: {', '.join(unique_vals[:10])}")
                
                else:
                    content.append("*Sheet is empty*")
                
            except Exception as e:
                content.append(f"Error reading sheet {sheet_name}: {str(e)}")
            
            content.append("")
        
        full_content = "\n".join(content)
        
        # Save to file
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(full_content)
        
        return full_content
        
    except Exception as e:
        error_msg = f"Error extracting Excel content: {str(e)}"
        print(error_msg)
        return error_msg

def extract_pdf_content(pdf_path, output_path):
    """
    Extract text content from PDF file
    """
    print(f"Extracting PDF content from: {pdf_path}")
    
    try:
        content = []
        content.append(f"# PDF File: {os.path.basename(pdf_path)}")
        content.append("=" * 50)
        content.append("")
        
        with open(pdf_path, 'rb') as file:
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
        
        return full_content
        
    except Exception as e:
        error_msg = f"Error extracting PDF content: {str(e)}"
        print(error_msg)
        return error_msg

def main():
    """Main extraction function"""
    script_dir = Path(__file__).parent
    client_docs_dir = script_dir / "clientDocs"
    output_dir = script_dir / "documentation"
    
    print("P360 Client Documents Extractor")
    print("=" * 40)
    
    # Files to extract
    files_to_extract = [
        {
            "file": "DRAFT-P360-Use Cases-Features-v1.0.xlsx",
            "type": "excel",
            "output": "P360_UseCases_Features_extracted.md"
        },
        {
            "file": "P360 DSP -- External Scopes (1) 1.pdf",
            "type": "pdf", 
            "output": "P360_External_Scopes_extracted.md"
        },
        {
            "file": "P360 DSP Build _ TTD.pdf",
            "type": "pdf",
            "output": "P360_TTD_Build_extracted.md"
        }
    ]
    
    results = {}
    
    for file_info in files_to_extract:
        file_path = client_docs_dir / file_info["file"]
        output_path = output_dir / file_info["output"]
        
        print(f"\nProcessing: {file_info['file']}")
        
        if not file_path.exists():
            print(f"Warning: File not found - {file_path}")
            continue
        
        if file_info["type"] == "excel":
            content = extract_excel_content(str(file_path), str(output_path))
        elif file_info["type"] == "pdf":
            content = extract_pdf_content(str(file_path), str(output_path))
        else:
            print(f"Unknown file type: {file_info['type']}")
            continue
        
        results[file_info["file"]] = {
            "output_file": str(output_path),
            "content_preview": content[:500] + "..." if len(content) > 500 else content
        }
        
        print(f"✅ Extracted to: {output_path}")
    
    # Summary
    print(f"\n{'='*50}")
    print("EXTRACTION SUMMARY")
    print(f"{'='*50}")
    
    for filename, result in results.items():
        print(f"\n📄 {filename}")
        print(f"   Output: {result['output_file']}")
        print(f"   Preview: {result['content_preview'][:100]}...")
    
    return len(results) > 0

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
