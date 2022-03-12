import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRepositories } from '../actions/repository';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import api from '../utils/api';
import { USER_NAME } from '../actions/types';

const GithubTreeView = (props) => {
  const [repositories, setRepositories] = useState([]);
  const [pulls, setPulls] = useState({});
  const [commits, setCommits] = useState({});
  const username = USER_NAME;

  useEffect(() => {
    FetchRepositories(username);
  }, []);

  async function FetchRepositories(username) {
    const res = await api.get(`/repository/${username}`);
    console.log(res);
    setRepositories(res.data);
  }

  async function FetchPulls(username, reponame) {
    const res = await api.get(`/pulls/${username}/${reponame}`);
    console.log(res);
    setPulls({ ...pulls, [reponame]: res.data });
  }

  async function FetchCommits(username, reponame, pullnumber, pullid) {
    const res = await api.get(`/commits/${username}/${reponame}/${pullnumber}`);
    console.log(res);
    setCommits({ ...commits, [pullid]: res.data });
  }

  return (
    <TreeView
      aria-label='rich object'
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 500, flexGrow: 1, maxWidth: 500, overflowY: 'auto', paddingTop:'50px',paddingLeft:'30px' }}
    >
      {repositories.map((node) => (
        <TreeItem
          key={node.id}
          nodeId={node.id}
          label={node.name}
          onClick={() => FetchPulls(username, node.name)}
        >
          {pulls[node.name] &&
            !!pulls[node.name].length &&
            pulls[node.name].map((pullnode) => (
              <TreeItem
                key={pullnode.id}
                nodeId={pullnode.id}
                label={pullnode.title}
                onClick={() =>
                  FetchCommits(
                    username,
                    node.name,
                    pullnode.number,
                    pullnode.id
                  )
                }
              >
                {commits[pullnode.id] &&
                  !!commits[pullnode.id].length &&
                  commits[pullnode.id].map((commitnode) => (
                    <TreeItem
                      key={commitnode.sha}
                      nodeId={commitnode.sha}
                      label={commitnode.filename}
                    ></TreeItem>
                  ))}
              </TreeItem>
            ))}
        </TreeItem>
      ))}
    </TreeView>
  );
};

const mapStateToProps = (state) => ({
  repository: state.repositories,
});

export default connect(mapStateToProps, { getRepositories })(GithubTreeView);
