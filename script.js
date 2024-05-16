const textArea = document.querySelector('textarea');

const pickerOpts = {
    types: [
        {
            description: "JSON Files",
            accept: {
                "application/json": [".json"],
            },
        },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
};

// create a reference for our file handle
let fileHandle;

async function getFile() {
    // open file picker, destructure the one element returned array
    [fileHandle] = await window.showOpenFilePicker(pickerOpts);

    const file = await fileHandle.getFile();
    const fileContents = await file.text();

    // run code with our fileHandle
    textArea.textContent = fileContents;
}

async function getNewFileHandle() {
    const opts = {
        suggestedName: 'Project.json',
        types: [
            {
                description: "JSON file",
                accept: { "application/json": [".json"] },
            },
        ],
    };
    return await window.showSaveFilePicker(opts);
}


// fileHandle is an instance of FileSystemFileHandle..
async function writeFile(fileHandle, contents) {
    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(contents);
    // Close the file and write the contents to disk.
    await writable.close();
}

function saveFile() {
    const fileHandle = getNewFileHandle();
    const contents = textArea.textContent;

    console.log(contents);

    writeFile(fileHandle, contents);
}