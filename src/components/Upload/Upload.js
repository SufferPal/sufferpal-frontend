import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
// Require the module
import FitParser from 'fit-file-parser';
// // Read a .FIT file
// const fs = require('fs');

const Upload = () => {
  const [activity, setActivity] = useState({});
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    //console.log(typeof acceptedFiles[0]);

    acceptedFiles.forEach((file) => {
      //console.log(file);
      //console.log(JSON.stringify(file));
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.onload = () => {
        const binaryString = reader.result;
        //console.log(JSON.stringify(binaryString));
        // console.log(binaryString);
        // fs.readFile('./example.fit', function (err, content) {
        //   // Create a FitParser instance (options argument is optional)
        const fitParser = new FitParser({
          force: true,
          speedUnit: 'km/h',
          lengthUnit: 'km',
          temperatureUnit: 'kelvin',
          elapsedRecordField: true,
          mode: 'list',
        });

        //   // Parse your file
        fitParser.parse(binaryString, function (error, data) {
          // Handle result of parse method
          //   if (error) {
          //     console.log(error);
          //   } else {
          //     console.log(JSON.stringify(data));
          //   }
          //console.log(data);
          setActivity(data);
        });
        // });
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    console.log(activity);
    //console.log(activity?.activity?.sessions[0].total_distance);
  }, [activity]);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
    </div>
  );
};

export default Upload;
