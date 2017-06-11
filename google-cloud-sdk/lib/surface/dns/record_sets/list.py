# Copyright 2014 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""gcloud dns record-sets list command."""

from apitools.base.py import list_pager

from googlecloudsdk.api_lib.dns import util
from googlecloudsdk.api_lib.util import apis
from googlecloudsdk.calliope import base
from googlecloudsdk.calliope import exceptions
from googlecloudsdk.command_lib.dns import flags
from googlecloudsdk.core import properties


class List(base.ListCommand):
  """View the list of record-sets in a managed-zone.

  This command displays the list of record-sets contained within the specified
  managed-zone.

  ## EXAMPLES

  To see the list of all record-sets in my_zone, run:

    $ {command} --zone my_zone

  To see the list of first 10 record-sets in my_zone, run:

    $ {command} --zone my_zone --limit=10

  To see the list of 'my.zone.com.' record-sets in my_zone, run:

    $ {command} --zone my_zone --name="my.zone.com."

  To see the list of 'my.zone.com.' CNAME record-sets in my_zone, run:

    $ {command} --zone my_zone --name="my.zone.com." --type="CNAME"
  """

  @staticmethod
  def Args(parser):
    flags.GetZoneArg().AddToParser(parser)
    parser.add_argument(
        '--name', required=False,
        help='Only list record-sets with this exact domain name.')
    parser.add_argument(
        '--type', required=False,
        help='Only list records of this type. If present, the --name parameter '
        'must also be present.')
    parser.display_info.AddFormat("""
        table(
              name,
              type,
              ttl,
              rrdatas.list():label=DATA
            )
        """)

  def Run(self, args):
    api_version = 'v1'
    # If in the future there are differences between API version, do NOT use
    # this patter of checking ReleaseTrack. Break this into multiple classes.
    if self.ReleaseTrack() == base.ReleaseTrack.BETA:
      api_version = 'v2beta1'

    dns_client = apis.GetClientInstance('dns', api_version)

    zone_ref = util.GetRegistry(api_version).Parse(
        args.zone,
        params={
            'project': properties.VALUES.core.project.GetOrFail,
        },
        collection='dns.managedZones')

    if args.type and not args.name:
      raise exceptions.ToolException(
          '--name should also be provided when --type is used')

    return list_pager.YieldFromList(
        dns_client.resourceRecordSets,
        dns_client.MESSAGES_MODULE.DnsResourceRecordSetsListRequest(
            project=zone_ref.project,
            managedZone=zone_ref.Name(),
            name=util.AppendTrailingDot(args.name),
            type=args.type),
        limit=args.limit, field='rrsets')
