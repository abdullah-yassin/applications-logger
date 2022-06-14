import React, {useCallback, useEffect, useState} from 'react';
import {GetAllApplicationsLogger} from "../../../Services";
import {ApplicationsLoggerTable, ApplicationsLoggerTableFilter} from "./components";
import moment from 'moment';
import './ApplicationsLogger.Style.scss'

const ApplicationsLoggerView = () => {
    const [isApplicationsLoading, setIsApplicationsLoading] = useState(false);
    const [applicationsFilter, setApplicationsFilter] = useState({});
    const [filterValue, setFilterValue] = useState(0);
    const [applications, setApplications] = useState({
        totalCount: 0,
        result: []
    });

    /**
     * @author Abdallah Yassin (abdallah-yassin@outlook.com)
     * @Description method to call all applications logs from logger services
     */
    const getAllApplicationsLogs = useCallback(async () => {
        setIsApplicationsLoading(true);

        const response = await GetAllApplicationsLogger();
        if (response && response.status === 200) {
            const {result} = response.data;
            setApplications({result: result.auditLog, totalCount: result.recordsFiltered});

            setIsApplicationsLoading(false);
        } else {
            setApplications({
                totalCount: 0, result: []
            });

            setIsApplicationsLoading(false);
        }
    }, []);

    /**
     * @author Abdallah Yassin (abdallah-yassin@outlook.com)
     * @Description A method to get the difference between dates
     */
    const getDateCondition = useCallback((filterValue, columnValue, rowValue) => {
        if (filterValue.relatedTo && applicationsFilter[filterValue.relatedTo].value) {
            if (filterValue.isLess) {
                return moment(columnValue).isSameOrAfter(filterValue.value) && moment(rowValue).isSameOrBefore(applicationsFilter[filterValue.relatedTo].value)
            }
            return moment(columnValue).isSameOrBefore(filterValue.value) && moment(rowValue).isSameOrAfter(applicationsFilter[filterValue.relatedTo].value)
        }

        if (filterValue.isLess)
            return moment(columnValue).isSameOrAfter(filterValue.value)

        return moment(columnValue).isSameOrBefore(filterValue.value)
    }, [applicationsFilter]);

    /**
     * @author Abdallah Yassin (abdallah-yassin@outlook.com)
     * @Description A method to filter the table data based on the applicationsFilter state
     */
    const getFilteredDataHandler = useCallback((row) => {
        const filledData = Object.entries(applicationsFilter).filter((item) => item[1]);

        if (filledData.length > 0) {
            setFilterValue(100);

            return Object.entries(row)
                .some((item) =>
                    filledData.some((el) => {
                        return (
                            ((el[1].dataKey === item[0]) && item[1]) &&
                            (el[1].isDate ? getDateCondition(el[1], item[1], row) : (`${item[1] || ''}`.toLowerCase() === (`${el[1].value || ''}`.toLowerCase())))
                        )
                    })
                )
        }

        return true;
    }, [applicationsFilter, getDateCondition]);

    const onFilterChangeHandler = (newValue) => {
        setApplicationsFilter(newValue);
    };

    const onFilterValueChangeHandler = (newValue) => {
        setFilterValue(newValue);
    };

    useEffect(() => {
        getAllApplicationsLogs();
    }, [getAllApplicationsLogs]);

    return (
        <div className="applications-logger-wrapper view-wrapper">
            <ApplicationsLoggerTableFilter
                applicationsFilter={applicationsFilter}
                onFilterChangeHandler={onFilterChangeHandler}
                onFilterValueChangeHandler={onFilterValueChangeHandler}
            />
            <ApplicationsLoggerTable
                filterValue={filterValue}
                data={applications.result}
                isApplicationsLoading={isApplicationsLoading}
                getFilteredDataHandler={getFilteredDataHandler}
            />
        </div>
    );
};

export default ApplicationsLoggerView;
