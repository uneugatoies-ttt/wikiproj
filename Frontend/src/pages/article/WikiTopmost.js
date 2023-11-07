import React from 'react';

function WikiTopmost() {
    const [task, setTask] = React.useState(null);

    let search = window.location.search;
    let params = new URLSearchParams(search);

    React.useEffect(() => {
        if (!params.get('task')) {
            setTask('wikitop');
        } else {
            setTask(params.get('task'));
        }
    }, [])

    if (task === 'wikitop') {
        return (
            <div>
                wikitop
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

export default WikiTopmost;