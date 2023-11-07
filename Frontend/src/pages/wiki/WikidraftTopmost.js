import React from 'react';


function WikidraftTopmost() {
    const [task, setTask] = React.useState(null);

    let search = window.location.search;
    let params = new URLSearchParams(search);

    React.useEffect(() => {
        if (!params.get('task')) {
            setTask('create-draft');
        } else {
            setTask(params.get('task'));
        }
    }, [])

    if (task === 'create-draft') {
        return (
            <div>
                wikidraft
            </div>
        );    
    } else {
        return (
            <div>
                UNRECOGNIZED TASK
            </div>
        );
    } 
}

export default WikidraftTopmost;