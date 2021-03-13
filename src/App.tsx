import React, {useEffect, useLayoutEffect, useState, useRef, ChangeEvent} from 'react';
import './App.css';

function App() {

    const [data, setData] = useState<string[]>();
    const [managedData, setManagedData] = useState<string[]>();
    const [searchText, setSearchText] = useState('');
    const firstUpdate = useRef(true);

    function fetchData() {
        fetch("https://api.publicapis.org/categories")
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                    setManagedData(result);
                }
            )
    }

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            fetchData();
        }
    });

    useEffect(() => {

        let preManagedData:string[] = [];
        data?.forEach(function(entry) {
            if (entry.includes(searchText)) {
                preManagedData.push(entry);
            }
        });

        setManagedData(preManagedData);
    }, [searchText])

    return (
        <div className="App" style={{paddingTop:'20px'}}>
            <label htmlFor="male">Search : </label>
            <input type="text" id="search" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setSearchText(event.target.value);
            }}/>
            <table style={{marginTop:'20px'}}>
                <thead>
                <tr>
                    <th>Categories</th>
                </tr>
                </thead>
                <tbody>
                {managedData?.map((el: string, index: number) => (
                    <tr key={index}>
                        <td>{el}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
