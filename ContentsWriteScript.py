import os;


def read_and_write_contents(folder_path, output_file):
    skip_folders = {'.git', '.github', '.vs', '.vscode', 'node_modules','packages', 'bin', 'obj'}
    
    allowed_extensions = {'.cs', '.js'}
    with open(output_file, 'w',encoding='utf-8' ) as outfile:
        for root, dirs, files in os.walk(folder_path, topdown=True):
            dirs[:] = [d for d in dirs if d not in skip_folders and os.path.join(root, d) not in skip_folders]   
            for filename in files:
             if os.path.splitext(filename)[1].lower() in allowed_extensions:
                file_path = os.path.join(root, filename)
                outfile.write(f"//{file_path}\n\n")

                try:
                    with open(file_path, 'rb') as file:
                         contents= file.read()
                         try:
                          decoded_contents = contents.decode('utf-8')
                         except UnicodeDecodeError:
                           decoded_contents = contents.decode('latin-1')
                         outfile.write(f"{decoded_contents}\n\n")
                except Exception as e:
                    print(f"Error reading file {file_path}: {e}")

folder_path = "c:/Users/kkagiri/source/repos/Hyoung.Fms/";
output_file = "./Contents.txt";

read_and_write_contents(folder_path, output_file)


                