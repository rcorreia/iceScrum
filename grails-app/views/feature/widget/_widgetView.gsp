%{--
- Copyright (c) 2010 iceScrum Technologies.
-
- This file is part of iceScrum.
-
- iceScrum is free software: you can redistribute it and/or modify
- it under the terms of the GNU Affero General Public License as published by
- the Free Software Foundation, either version 3 of the License.
-
- iceScrum is distributed in the hope that it will be useful,
- but WITHOUT ANY WARRANTY; without even the implied warranty of
- MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
- GNU General Public License for more details.
-
- You should have received a copy of the GNU Affero General Public License
- along with iceScrum.  If not, see <http://www.gnu.org/licenses/>.
-
- Authors:
-
- Vincent Barrier (vbarrier@kagilum.com)
--}%
<ul class="list postit-rows"
    id="widget-${controllerName}"
    style="display:${features ? 'block' : 'none'};"
    ${request.productOwner || request.scrumMaster ? 'data-ui-draggable' : ''}
    data-ui-draggable-selector=".postit-row"
    data-ui-draggable-helper="clone"
    data-ui-draggable-append-to="body">
    <g:each in="${features}" var="feature">
        <is:cache  cache="featureCache" key="postit-small-${feature.id}-${feature.lastUpdated}">
            <li data-elemid="${feature.id}" class="postit-row postit-row-feature">
                <is:postitIcon name="${feature.name.encodeAsHTML()}" color="${feature.color}"/>
                <is:truncated size="30" encodedHTML="true">${feature.name.encodeAsHTML()}</is:truncated>
            </li>
        </is:cache>
    </g:each>
</ul>
<div class="box-blank" style="display:${features ? 'none' : 'block'};">
    ${message(code: 'is.widget.feature.empty')}
</div>
<entry:point id="${controllerName}-${actionName}-widget" model="[feature:feature]"/>