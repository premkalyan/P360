# PR-Agent MCP Error Response

## Call Details
- **Tool**: `mcp_pr-agent-mcp_pr_review`
- **PR URL**: https://github.com/premkalyan/P360/pull/1
- **Timestamp**: 2025-09-07 20:15:35.728
- **Status**: FAILED

## Error Summary
**Primary Issue**: GitHub token configuration missing for PR-agent MCP

**Error Type**: `ValueError: GitHub token is required when using user deployment`

**Reference**: https://github.com/Codium-ai/pr-agent#method-2-run-from-source

## Full Error Response

```
PR Review completed for: https://github.com/premkalyan/P360/pull/1

[32m2025-09-07 20:15:35.728[0m | [31m[1mERROR   [0m | [36mpr_agent.agent.pr_agent[0m:[36mhandle_request[0m:[36m125[0m - [31m[1mFailed to process the command.[0m
[33m[1mTraceback (most recent call last):[0m

  File "[32m/Users/premkalyan/code/Prometheus/agents/pr-agent/pr_agent/git_providers/[0m[32m[1mgithub_provider.py[0m", line [33m843[0m, in [35m_get_github_client[0m
    [1mtoken[0m [35m[1m=[0m [1mget_settings[0m[1m([0m[1m)[0m[35m[1m.[0m[1mgithub[0m[35m[1m.[0m[1muser_token[0m

  File "/Users/premkalyan/code/Prometheus/agents/pr-agent/venv/lib/python3.13/site-packages/dynaconf/utils/boxing.py", line 21, in evaluate
    value = f(dynabox, item, *args, **kwargs)
  File "/Users/premkalyan/code/Prometheus/agents/pr-agent/venv/lib/python3.13/site-packages/dynaconf/utils/boxing.py", line 44, in __getattr__
    return super().__getattr__(n_item, *args, **kwargs)
  File "/Users/premkalyan/code/Prometheus/agents/pr-agent/venv/lib/python3.13/site-packages/dynaconf/vendor/box/box.py", line 176, in __getattr__
    raise BoxKeyError(str(E))from _A

[31m[1mdynaconf.vendor.box.exceptions.BoxKeyError[0m:[1m "'DynaBox' object has no attribute 'user_token'"[0m

The above exception was the direct cause of the following exception:

[33m[1mTraceback (most recent call last):[0m

  File "[32m/Users/premkalyan/code/Prometheus/agents/pr-agent/pr_agent/git_providers/[0m[32m[1m__init__.py[0m", line [33m62[0m, in [35mget_git_provider_with_context[0m
    [1mgit_provider[0m [35m[1m=[0m [1m_GIT_PROVIDERS[0m[1m[[0m[1mprovider_id[0m[1m][0m[1m([0m[1mpr_url[0m[1m)[0m

  File "[32m/Users/premkalyan/code/Prometheus/agents/pr-agent/pr_agent/git_providers/[0m[32m[1mgithub_provider.py[0m", line [33m42[0m, in [35m__init__[0m
    [1mself[0m[35m[1m.[0m[1mgithub_client[0m [35m[1m=[0m [1mself[0m[35m[1m.[0m[1m_get_github_client[0m[1m([0m[1m)[0m

  File "[32m/Users/premkalyan/code/Prometheus/agents/pr-agent/pr_agent/git_providers/[0m[32m[1mgithub_provider.py[0m", line [33m845[0m, in [35m_get_github_client[0m
    [35m[1mraise[0m [1mValueError[0m[1m([0m

[31m[1mValueError[0m:[1m GitHub token is required when using user deployment. See: https://github.com/Codium-ai/pr-agent#method-2-run-from-source[0m

The above exception was the direct cause of the following exception:

[33m[1mTraceback (most recent call last):[0m

  File "<frozen runpy>", line 198, in _run_module_as_main
  File "<frozen runpy>", line 88, in _run_code

  File "[32m/Users/premkalyan/code/Prometheus/agents/pr-agent/pr_agent/[0m[32m[1mcli.py[0m", line [33m105[0m, in [35m<module>[0m
    [1mrun[0m[1m([0m[1m)[0m

  File "[32m/Users/premkalyan/code/Prometheus/agents/pr-agent/pr_agent/[0m[32m[1mcli.py[0m", line [33m99[0m, in [35mrun[0m
    [1mresult[0m [35m[1m=[0m [1masyncio[0m[35m[1m.[0m[1mrun[0m[1m([0m[1mmain[0m[1m)[0m

  File "[32m/opt/homebrew/Cellar/python@3.13/3.13.5/Frameworks/Python.framework/Versions/3.13/lib/python3.13/asyncio/[0m[32m[1mrunners.py[0m", line [33m195[0m, in [35mrun[0m
    [35m[1mreturn[0m [1mrunner[0m[35m[1m.[0m[1mrun[0m[1m([0m[1mmain[0m[1m)[0m

  File "[32m/opt/homebrew/Cellar/python@3.13/3.13.5/Frameworks/Python.framework/Versions/3.13/lib/python3.13/asyncio/[0m[32m[1mrunners.py[0m", line [33m118[0m, in [35mrun[0m
    [35m[1mreturn[0m [1mself[0m[35m[1m.[0m[1m_loop[0m[35m[1m.[0m[1mrun_until_complete[0m[1m([0m[1mtask[0m[1m)[0m

  File "[32m/opt/homebrew/Cellar/python@3.13/3.13.5/Frameworks/Python.framework/Versions/3.13/lib/python3.13/asyncio/[0m[32m[1mbase_events.py[0m", line [33m712[0m, in [35mrun_until_complete[0m
    [1mself[0m[35m[1m.[0m[1mrun_forever[0m[1m([0m[1m)[0m

  File "[32m/opt/homebrew/Cellar/python@3.13/3.13.5/Frameworks/Python.framework/Versions/3.13/lib/python3.13/asyncio/[0m[32m[1mbase_events.py[0m", line [33m683[0m, in [35mrun_forever[0m
    [1mself[0m[35m[1m.[0m[1m_run_once[0m[1m([0m[1m)[0m

  File "[32m/opt/homebrew/Cellar/python@3.13/3.13.5/Frameworks/Python.framework/Versions/3.13/lib/python3.13/aseycio/[0m[32m[1mbase_events.py[0m", line [33m2042[0m, in [35m_run_once[0m
    [1mhandle[0m[35m[1m.[0m[1m_run[0m[1m([0m[1m)[0m

  File "[32m/opt/homebrew/Cellar/python@3.13/3.13.5/Frameworks/Python.framework/Versions/3.13/lib/python3.13/asyncio/[0m[32m[1mevents.py[0m", line [33m89[0m, in [35m_run[0m
    [1mself[0m[35m[1m.[0m[1m_context[0m[35m[1m.[0m[1mrun[0m[1m([0m[1mself[0m[35m[1m.[0m[1m_callback[0m[1m,[0m [35m[1m*[0m[1mself[0m[35m[1m.[0m[1m_args[0m[1m)[0m

> File "[32m/Users/premkalyan/code/Prometheus/agents/pr-agent/pr_agent/agent/[0m[32m[1mpr_agent.py[0m", line [33m123[0m, in [35mhandle_request[0m
    [35m[1mreturn[0m [35m[1mawait[0m [1mself[0m[35m[1m.[0m[1m_handle_request[0m[1m([0m[1mpr_url[0m[1m,[0m [1mrequest[0m[1m,[0m [1mnotify[0m[1m)[0m

  File "[32m/Users/premkalyan/code/Prometheus/agents/pr-agent/pr_agent/agent/[0m[32m[1mpr_agent.py[0m", line [33m56[0m, in [35m_handle_request[0m
    [1mapply_repo_settings[0m[1m([0m[1mpr_url[0m[1m)[0m

  File "[32m/Users/premkalyan/code/Prometheus/agents/pr-agent/pr_agent/git_providers/[0m[32m[1mutils.py[0m", line [33m15[0m, in [35mapply_repo_settings[0m
    [1mgit_provider[0m [35m[1m=[0m [1mget_git_provider_with_context[0m[1m([0m[1mpr_url[0m[1m)[0m

  File "[32m/Users/premkalyan/code/Prometheus/agents/pr-agent/pr_agent/git_providers/[0m[32m[1m__init__.py[0m", line [33m67[0m, in [35mget_git_provider_with_context[0m
    [35m[1mraise[0m [1mValueError[0m[1m([0m[36mf"[0m[36mFailed to get git provider for [0m[1m{[0m[1mpr_url[0m[1m}[0m[36m"[0m[1m)[0m [35m[1mfrom[0m [1me[0m

[31m[1mValueError[0m:[1m Failed to get git provider for https://github.com/premkalyan/P360/pull/1[0m
```

## Usage Information

```
Usage: cli.py --pr-url=<URL on supported git hosting service> <command> [<args>].
For example:
- cli.py --pr_url=... review
- cli.py --pr_url=... describe
- cli.py --pr_url=... improve
- cli.py --pr_url=... ask "write me a poem about this PR"
- cli.py --pr_url=... reflect
- cli.py --issue_url=... similar_issue
- cli.py --pr_url/--issue_url= help_docs [<asked question>]

Supported commands:
- review / review_pr - Add a review that includes a summary of the PR and specific suggestions for improvement.
- ask / ask_question [question] - Ask a question about the PR.
- describe / describe_pr - Modify the PR title and description based on the PR's contents.
- improve / improve_code - Suggest improvements to the code in the PR as pull request comments ready to commit.
- reflect - Ask the PR author questions about the PR.
- update_changelog - Update the changelog based on the PR's contents.
- add_docs
- generate_labels
- help_docs - Ask a question, from either an issue or PR context, on a given repo (current context or a different one)

Configuration:
To edit any configuration parameter from 'configuration.toml', just add -config_path=<value>.
For example: 'python cli.py --pr_url=... review --pr_reviewer.extra_instructions="focus on the file: ..."'
```

## Root Cause Analysis

1. **Missing Configuration**: PR-agent MCP lacks GitHub user token
2. **Authentication Failure**: Cannot access GitHub API without proper credentials
3. **Deployment Mode**: Tool is configured for "user deployment" which requires personal access token

## Required Fix

The PR-agent MCP needs to be configured with:
- GitHub personal access token in settings/environment
- Proper authentication setup for accessing private repositories
- Token with appropriate permissions for PR operations

## Impact

**Blocked Operations:**
- ❌ `mcp_pr-agent-mcp_pr_review` - PR review generation
- ❌ `mcp_pr-agent-mcp_pr_describe` - PR description improvement  
- ❌ `mcp_pr-agent-mcp_pr_improve` - Code improvement suggestions
- ❌ `mcp_pr-agent-mcp_pr_ask` - PR-specific questions

## Target PRs for Review (Once Fixed)

1. **PR #1**: https://github.com/premkalyan/P360/pull/1
   - P360-19: Complete Authentication UI with Testing Infrastructure
   
2. **PR #2**: https://github.com/premkalyan/P360/pull/2  
   - P360-67: Campaign Configuration UI - Complete Implementation

## Next Steps

1. Configure GitHub token in PR-agent MCP settings
2. Test authentication with a simple PR operation
3. Execute comprehensive PR reviews using MCP tools
4. Generate actionable improvement suggestions
5. Update JIRA stories with review feedback

