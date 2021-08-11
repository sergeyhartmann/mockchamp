const downloadObjectAsJson = (exportObj, exportName) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj, null, 4));

    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', exportName + '.json');

    // required for firefox
    document.body.appendChild(downloadAnchorNode);

    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};

export { downloadObjectAsJson };
