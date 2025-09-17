# Be sure to restart your server when you modify this file.

# Define an application-wide content security policy.
# See the Securing Rails Applications Guide for more information:
# https://guides.rubyonrails.org/security.html#content-security-policy-header

Rails.application.configure do
  config.content_security_policy do |policy|
    # TODO: fix this...
    # policy.default_src      :none
    policy.base_uri :self
    policy.connect_src :self, :https
    policy.form_action :self
    policy.font_src :self, :https, :data
    policy.img_src :self, :https, :data
    policy.object_src :none
    # policy.script_src       :self, :https, :unsafe_eval
    policy.style_src :self, :https, :unsafe_inline
    policy.frame_ancestors :none
    # Specify URI for violation reports
    # policy.report_uri "/csp-violation-report-endpoint"
  end

  # Generate session nonces for permitted importmap and inline scripts
  config.content_security_policy_nonce_generator = ->(request) do
    request.session.id.to_s
  end
  config.content_security_policy_nonce_directives = %w[script-src]

  # Report CSP violations to a specified URI. See:
  # https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only
  # config.content_security_policy_report_only = true
end
