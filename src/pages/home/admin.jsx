import React, { useState } from 'react';
import TabEo from './admin/eo';
import TabWork from './admin/work';
import TabPrint from './admin/print';
import TabSatulayar from './admin/satulayar';

const AdminPage = () => {
    const [tabIndex, setTabIndex] = useState(1); // Default to Sum Work (index 2)

    const renderTabContent = () => {
        switch (tabIndex) {
            case 1:
                return <TabEo />;
            case 2:
                return <TabWork />;
            case 3:
                return <TabPrint />;
            case 4:
                return <TabSatulayar />;
            default:
                return null;
        }
    }

    return (
        <div className='flex flex-col gap-3'>
            <div role="tablist" className="tabs tabs-bordered">
                <a onClick={() => setTabIndex(1)} role="1" className={`tab ${tabIndex === 1 ? 'tab-active font-bold' : ''}`}>Sum1 Eo</a>
                <a onClick={() => setTabIndex(2)} role="2" className={`tab ${tabIndex === 2 ? 'tab-active font-bold' : ''}`}>Sum Work</a>
                <a onClick={() => setTabIndex(3)} role="3" className={`tab ${tabIndex === 3 ? 'tab-active font-bold' : ''}`}>Sum24 Print</a>
                <a onClick={() => setTabIndex(4)} role="4" className={`tab ${tabIndex === 4 ? 'tab-active font-bold' : ''}`}>Satu Layar</a>
            </div>
            <div className='px-3 bg-base-100 rounded-md shadow-sm' >
                {renderTabContent()}
            </div>
        </div>
    )
}

export default AdminPage;
