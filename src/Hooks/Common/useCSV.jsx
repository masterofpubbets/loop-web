import { useState, useEffect } from 'react';


export const useCSV = () => {
    const [dataRead, setDataRead] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [fileError, setFileError] = useState(null);
    const [isFilePending, setIsFilePending] = useState(false);
    const [readDone, setReadDone] = useState(false);



    const readCSV = (file, delim) => {
        if (isActive) {
            setFileError(null)
            setIsFilePending(true)
            setReadDone(false)

            if (!file.type.includes("text/csv")) {
                setIsFilePending(false)
                setFileError("Select CSV file")
            } else {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const text = e.target.result;

                    const headersTemp = text.slice(0, text.indexOf('\n')).split(delim);
                    const rows = text.slice(text.indexOf('\n') + 1).split('\n');

                    const headers = headersTemp.map(h => h.replace('\r', ''))

                    const newArray = rows.map(row => {
                        const values = row.split(delim);
                        const eachObject = headers.reduce((obj, header, i) => {
                            obj[header] = values[i].replace('\r', '');
                            return obj;
                        }, {})
                        return eachObject;
                    })

                    setDataRead(newArray)
                }

                try {
                    reader.readAsText(file);
                    setIsFilePending(false)
                    setReadDone(true)
                } catch (er) {
                    setFileError(er.message)
                    setIsFilePending(false)
                }

            }

        }
    };


    useEffect(() => {
        setIsActive(true)
    }, []);


    return { dataRead, readCSV, fileError, isFilePending, readDone }
}