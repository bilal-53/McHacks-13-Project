import React, { Suspense, useEffect, useState } from "react";

import { db } from "./firebase";
import { onValue, ref, set } from "firebase/database";

function GetIssues() {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        const query = ref(db, "issues");

        return onValue(query, (snapshot) => {
            const data = snapshot.val();

            const issues = Object.values(data);

            

            setIssues(issues)

        })
    }, []);

    return (
        <div>
            {issues.map((issue, index) => (
                // <div {...issue} key={index} />
                <div key={index}>{issue.title}</div>
            ))}

            <button onClick={add}></button>
        </div>
    );
}

export default GetIssues;